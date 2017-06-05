package com.spotify.api.controller.controller;

import com.spotify.api.controller.helper.SearchModel;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.HttpClientBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

import static org.apache.http.HttpHeaders.USER_AGENT;

/**
 * Created by Fatih Totrakanli on 31/05/2017.
 */

@RestController
@RequestMapping(value = "search")
public class SearchController {

    private static Logger logger = LoggerFactory.getLogger(SearchController.class.getName());

    @Value("${token}")
    private String token;

    @PostMapping(value = "/api")
    public StringBuffer searchQ(@RequestBody SearchModel search) throws IOException {

        String query = search.getQuery().equals("") ? "%2B" : search.getQuery().replaceAll("\\s+", "%2B");
        logger.info(query + " search started...");

        String url = "https://api.spotify.com/v1/search?q=" + query + "&type=track&limit=" + search.getLimit() + "&offset=" + search.getOffset();

        HttpClient client = HttpClientBuilder.create().build();
        HttpGet request = new HttpGet(url);

        request.addHeader("User-Agent", USER_AGENT);
        request.addHeader("Authorization", "Bearer " + token);
        request.addHeader("Accept", "application/json");
        HttpResponse response = client.execute(request);

        logger.info("Response Code : " + response.getStatusLine().getStatusCode());

        if (response.getStatusLine().getStatusCode() == 401) {
            String error = "The server did not respond properly. Please check spotify authorization token from application.yml or get new token from (https://developer.spotify.com/web-api/console/get-search-item/).";
            logger.error(error);
            throw new RuntimeException(error);
        } else {
            if (response.getStatusLine().getStatusCode() != 200)
                throw new RuntimeException("Something went wrong.");
        }

        BufferedReader rd = new BufferedReader(new InputStreamReader(response.getEntity().getContent()));

        StringBuffer result = new StringBuffer();
        String line = "";
        logger.info("Reading response...");
        while ((line = rd.readLine()) != null) {
            result.append(line);
        }

        logger.info("Reading response completed successfully.");

        return result;
    }
}
