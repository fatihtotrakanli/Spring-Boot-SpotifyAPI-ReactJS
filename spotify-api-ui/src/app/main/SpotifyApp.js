import React, {Component} from 'react';
import Table from "react-bootstrap/lib/Table";
import Col from "react-bootstrap/lib/Col";
import Row from "react-bootstrap/lib/Row";
import TableItem from "./TableItem";
import Pagination from "../pagination/Pagination";
import Input from "../input/Input";
import Licence from "../licence/Licence";
import Limit from "../limit/Limit";
import RequestUtils from "../../utils/RequestUtils";
import "./SpotifyApp.css";

export default class SpotifyApp extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            loading: false,
            pageSize: 10,
            totalCount: 0
        };
    }

    __q = "Love is in the air";
    activePage = 1;

    render() {

        return (<Col className="appContainer">
                <Licence/>
                <Row>
                    <Col sm={4} style={{marginBottom: 20}}>
                        <Input loading={this.state.loading} query={this.__q} onChange={this.handleChange}/>
                    </Col>
                    <Row>
                        <Col className="pull-right" style={{marginRight: 30}}>
                            <Limit pageSize={this.state.pageSize} onRefresh={this.__refreshButtonClick}
                                   onChange={this.__pageSizeChange}/>
                        </Col>
                    </Row>
                </Row>
                {this.__renderTable()}
                <Pagination totalCount={this.state.totalCount} pageSize={this.state.pageSize} __q={this.__q}
                            activePage={this.activePage} onSelect={this.__handlePaginationSelect}/>
            </Col>
        );
    }

    __renderTable = () => {
        if (!this.state.loading)
            return (<Table striped bordered condensed hover>
                <thead>
                <tr>
                    <th className="alignTd">Image</th>
                    <th className="alignTd">Artist</th>
                    <th className="alignTd">Name</th>
                    <th className="alignTd">Album Name</th>
                    <th className="alignTd">Album Type</th>
                    <th className="alignTd">Type</th>
                    <th className="alignTd">Popularity</th>
                    <th className="alignTd">Play Preview</th>
                </tr>
                </thead>
                <tbody>
                {this.__renderTableContent()}
                </tbody>
            </Table>);
        else
            return (<i className="fa fa-circle-o-notch fa-spin" aria-hidden="true"/>);
    };

    __renderTableContent = ()=> {
        let datas = this.state.data;
        let tdArr = [];
        if (datas.length === 0) return null;
        for (let i = 0; i < datas.tracks.items.length; i++) {
            let data = datas.tracks.items[i];
            let image = data.album.images[0] ? data.album.images[0].url : "";
            tdArr.push(<TableItem key={i} data={data} image={image}/>);
        }
        return tdArr;
    };

    __refreshButtonClick = () => {
        this.__doRequest(this.__prepareSimpleData(this.__q, this.state.pageSize));
    };

    handleChange = (e:object)=> {
        this.__q = e.target.value.replace(/;/g, "");

        var delay = 700;
        clearTimeout(this.search);
        this.setState({loading: true});
        this.search = setTimeout(function () {
            if (this.__q)
                this.__doRequest(this.__prepareSimpleData(this.__q, this.state.pageSize));
            else
                this.__doRequest(this.__prepareSimpleData(" ", this.state.pageSize));
        }.bind(this), delay);
    };

    __handlePaginationSelect = (data:object, activePage:number) => {
        this.activePage = activePage;
        this.__doRequest(data)
    };

    __pageSizeChange = (e:object)=> {
        this.setState({pageSize: e.target.value});
        this.__doRequest(this.__prepareSimpleData(this.__q, e.target.value));
    };

    __prepareSimpleData = (query:string, limit:number):object => {
        let offset = (this.activePage - 1) * this.state.pageSize;
        return {
            query: query,
            offset: offset,
            limit: limit
        };
    };

    __doRequest = (data:object) => {
        RequestUtils.makeRequest("search/api", "POST", data, function (xhr) {
            if (xhr.status === 200) {
                let data = JSON.parse(xhr.responseText);
                this.setState({data: data, loading: false, totalCount: data.tracks.total});
            }
            else
                this.setState({loading: false});
        }.bind(this));
    };

    componentDidMount = () => {
        this.__doRequest(this.__prepareSimpleData(this.__q, this.state.pageSize));
    };

}
