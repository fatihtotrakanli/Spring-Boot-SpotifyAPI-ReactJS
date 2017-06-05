package com.spotify.api.controller.helper;

/**
 * Created by Fatih Totrakanli on 31/05/2017.
 */
public class SearchModel {

    private String query;

    private int limit = 20;

    private int offset = 0;

    public String getQuery() {
        return query;
    }

    public void setQuery(String query) {
        this.query = query;
    }

    public int getOffset() {
        return offset;
    }

    public void setOffset(int offset) {
        this.offset = offset;
    }

    public int getLimit() {
        return limit;
    }

    public void setLimit(int limit) {
        this.limit = limit;
    }
}
