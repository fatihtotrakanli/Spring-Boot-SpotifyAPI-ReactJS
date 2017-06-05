import React, {Component} from 'react';
import "../main/SpotifyApp.css";
import Paginations from "react-bootstrap/lib/Pagination";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";

export default class Pagination extends Component {

    render() {
        return (
            this.__renderPagination()
        );
    }

    __renderPagination = ()=> {
        let items = Math.ceil(this.props.totalCount / this.props.pageSize);
        let _start = (this.props.pageSize * (this.props.activePage - 1));
        let _end = _start + this.props.pageSize;
        let _total = this.props.totalCount || 0;
        let description = _total === 0 ? "Nothing to show." : "" + _total + " results are found. Showing " + parseInt(_start + 1, 10) + " - " + _end + " of them.";

        if (_end > _total)
            _end = _total;
        let pagination = (
            <span><p className="hidden-xs">{description}</p><p
                className="visible-xs">{_total} / {_start + 1}-{_end}</p></span>);
        return (
            <Col xs={12} className="pagination">
                <Row className="search-detail-grid-pagination">
                    <Paginations
                        className="hidden-xs" prev next first last ellipsis boundaryLinks
                        activePage={this.props.activePage}
                        onSelect={this.__handlePaginationSelect} items={items} maxButtons={5}/>
                    <Paginations
                        className="hidden-sm hidden-md hidden-lg" prev next ellipsis={false} boundaryLinks
                        activePage={this.props.activePage}
                        onSelect={this.__handlePaginationSelect} items={items} maxButtons={1}/>
                </Row>
                <Row>
                    <Col className="search-detail-grid-pagination">{pagination}</Col>
                </Row>
            </Col>);
    };

    __handlePaginationSelect = (eventKey)=> {
        this.activePage = eventKey;
        var offset = this.activePage - 1;
        offset = offset * this.props.pageSize;
        let data = {
            query: this.props.__q || " ",
            limit: this.props.pageSize,
            offset: offset
        };

        if (this.props.onSelect)
            this.props.onSelect(data, this.activePage);
    };
}
