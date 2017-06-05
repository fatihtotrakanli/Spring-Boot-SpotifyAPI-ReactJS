import jajax from "robe-ajax";
import Toast from "pre-toast/lib/Toast";

export const RequestUtils = {

    makeRequest(path, type, data, complete, success, error){

        let props = {
            "type": type,
            "dataType": "json",
            "error": function (jqXHR, errorThrown) {
                this.__handleError(jqXHR, errorThrown, error);
            }.bind(this),
            beforeSend: function (jqXHR, settings) {
                jqXHR.path = path;
            },
            "url": ("http://127.0.0.1:8081/rest/" + path),
            "contentType": "application/json; charset=utf-8",
            async: true,
            crossDomain: true
        };
        if (data)
            props["data"] = JSON.stringify(data);

        if (complete)
            props["complete"] = complete;

        if (success)
            props["success"] = success;

        jajax.ajax(props);
    },

    __handleError(jqXHR, errorThrown, error){
        if (jqXHR.status === 401)
            Toast.error("Authorization not found.");
        else if (jqXHR.status === 403)
            Toast.error("Authentication not found.");
        else if (jqXHR.status === 200) {
            //do nothing
        }
        else {
            if (error)
                error(jqXHR, errorThrown);
            else
                Toast.error("Something went wrong.");
        }
    }
};

export default RequestUtils;