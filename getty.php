<?php
/*$auth_token = '
curl -H "CONTENT-Type: application/json" -X POST -d \'{
    "client_id" "aneeqpg9wr7veqmzb3h2gqqy":,
    "client_secret": "B5VBMYbaN3rweUFUNQkQ9hnh47CNkQZJKATBEKxZNJt3k",
    "grant_type": "authorization_code"
  }\' https://connect.gettyimages.com/oauth2/token ';
print_r(exec($auth_token));
        */
$cmd ='curl -X GET https://connect.gettyimages.com/oauth2/auth/?response_type=token&client_id=aneeqpg9wr7veqmzb3h2gqqy&state=xyz';
print_r(exec($cmd));
$cmd ='
curl -# -H "Content-Type: application/json" -X POST -g  -d \'{
 "RequestHeader":{
   "Token":"TjLeDWbReRpOC630Pk7meWIFxs96Fcrb/EAmZapdrWd/njyw4EXs0Ig0VzjKnIMtSrdojcdbC7PXa5/zdgkoVv++KCUbx/H7Sk1nlsRQldxl7A/NDmjWOsOteLEsPwlUWd8MOiPnbcujBIalDxlo+0lGpBWlm3QwNoz1giwc+Ps=|77u/VUdmekpTWDVrZjhjVUtZRm9hWWEKMTE1NTcKClVTOXBCZz09CldUWnBCZz09CjAKNnRkZ3RjYXJua3ZwYmFoNnN6eHRlaHNwCjEyNy4wLjAuMQowCjExNTU3CgoxMTU1Nwo=|3",
   "Detail":"",
   "CoordinationId":""
 },
 "SearchForImagesRequestBody":{
   "CountryCode":"USA",
   "Filter":{
     "Collections":{
       "Ids":[
         ""
       ],
       "Mode":""
     },
     "EditorialSegments":[
       ""
     ],
     "EditorialSources":{
       "Ids":[
         ""
       ],
       "Mode":""
     },
     "ExcludeNudity":"true",
     "FileTypes":[
       ""
     ],
     "GraphicStyles":[
       ""
     ],
     "ImageFamilies":[
       ""
     ],
     "LicensingModels":[
       ""
     ],
     "Orientations":[
       ""
     ],
     "ProductOfferings":[
       ""
     ],
     "Refinements":[
       {
         "Category":"",
         "Id":""
       }
     ]
   },
   "Language":"en-us",
   "Query":{
     "KeywordIds":[
       ""
     ],
     "SpecificPersons":[
       ""
     ],
     "EntityUris":[
       ""
     ],
     "DateCreatedRange":{
       "EndDate":"",
       "StartDate":""
     },
     "EventId":"",
     "SearchPhrase":""
   },
   "ResultOptions":{
     "IncludeKeywords":false,
     "ItemCount":10,
     "ItemStartNumber":1,
     "RefinementOptionsSet":"",
     "EditorialSortOrder":"",
     "CreativeSortOrder":"",
     "BlendedSortOrder":""
   }
 }
}\' https://connect.gettyimages.com/v2/search/SearchForImages';
//$results = exec($cmd);



// - - - - - - - - - - -- --  - - - - - - - - - -  - - - - -
	// $c = curl_init( "https://connect.gettyimages.com/oauth2/token" );

	// // Set the cURL options
	// curl_setopt( $c, CURLOPT_RETURNTRANSFER, TRUE );
	// // curl_setopt( $c, CURLOPT_USERAGENT, "Alfred Gist Workflow" );
	// // curl_setopt( $c, CURLOPT_USERPWD, "$username:$password" );
	// curl_setopt( $c, CURLOPT_CONNECTTIMEOUT, 10 );

	// // Execute the cURL command
	// $images = curl_exec( $c );

	// // grab the error if there is one
	// $error = curl_errno( $c );

	// if ( ! curl_errno( $c ) )
	// {
	// 	// Turn the github json into an associative array
	// 	$images = json_decode( $images, TRUE );
	// 	// Don't use the cache
	// 	$usecache = FALSE;
	// 	// there was no error
	// 	$error = FALSE;

	// 	// DEBUGGING
	// 	// echo 'I made it to 1' . "\n";

	// } else {
	// 	// There was an error, so just use the cached copy
     echo $results;



    /*
        $results = json_decode( $results, TRUE );
		// d($results);

		$SearchForImagesResult = $results['SearchForImagesResult'];
		// d($SearchForImagesResult);

		$images = array();
		$images = $SearchForImagesResult['Images'];
		// d($images);

		$ul = "<ul>";
        var_dump($images);
		foreach ($images as $image) {
			$i = array(
				'title'    => $image['Title'],
				// this is the raw url in ['files'][TITLE]['raw_url']
				'url'      => $image['UrlThumb'], //[key( $image['stdClass'] )]['UrlThumb'],
			);
			$li = '<li><img src="' . $i['url'] . '" /><p>' . $i['title'] . '</p></li>';
			$ul .= $li;
			// d($i);

		}
		$ul .= "</ul>";

		echo $ul;

	// 	// use the cache
	// 	$usecache = TRUE;

	// 	// DEBUGGING
	// 	// echo 'I made it to 2' . "\n";

	// }

	// // Close the cURL object to free resources
	// curl_close( $c );
