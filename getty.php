<?php

$url = 'https://connect.gettyimages.com/oauth2/token';


// use key 'http' even if you send the request to https://...
$options = array(
    'http' => array(
        'method'  => 'POST',
        'content' => 'grant_type=client_credentials&client_id=dte5xunv2zb9wtpawtsfwkvg&client_secret=nzakAxZy6PYuXcMXnrmvHGFcsy2pdRavvkfTveEjMTtGZ',
    ),
);
$context  = stream_context_create($options);
$result = file_get_contents($url, false, $context);


// search string, let's look up "tree"
$searchPhrase = "tree";

// build array to query api for images
$searchImagesArray = array (
	"RequestHeader" => array (
		"Token" => $result['access_token'] // Token received from a CreateSession/RenewSession API call
	),
	"SearchForImagesRequestBody" => array (
 		"Query" => array (
			"SearchPhrase" => $searchPhrase
 		),
 		"ResultOptions" => array (
			"IncludeKeywords" => "false",
 			"ItemCount" => 25, // return 25 items
 			"ItemStartNumber" => 1 // 1-based int, start at the first page
 		)
	)
);

// encode to json
echo json_encode($searchImagesArray);


$endpoint = "http://connect.gettyimages.com/v2/search/SearchForImages";

// create client and set json data and datatype
$httpClient = new Zend_Http_Client($endpoint);
$httpClient->setRawData($json, 'application/json');
$httpClient->setMethod(Zend_Http_Client::POST); // all getty api requests are POST

// returns Zend_Http_Response
$response = $httpClient->request();

$body = null;

// evaluate for success response
if ($response->isSuccessful()) {
	$body = json_decode($response->getBody()); // returns stdObject
} else {
	// report error
}

// retrieves the image array of stdObjects
$images = $body->SearchForImagesResult->Images;
echo json_encode($images);
// total count of items matching this search in the API
$itemTotalCount = $body->SearchForImagesResult->ItemTotalCount;
?>