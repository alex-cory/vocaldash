<?php
$cmd ='
curl -# -H "Content-Type: application/json" -X POST -g  -d \'{
 "RequestHeader":{
   "Token":"2+vonKHqbt0KNAK81a/RDXI0E7tgG1jiUnUhG3Jhqnz82SuIMECo6qLGJEIyc7/Vj8cA1IjTGTkcLojEvBXGePEX67Qkka7DEeYds7Pmd4osJO1nKyqJ1uL8CCz6+XMNyKEq1XRbNV0lLQ48serRb73H8oBXlxSH0wBgU4oYM7I=|77u/UnIxWWp2NTIwUXhySFAxOVB4eVUKMTE1NTcKCnQrVm5CZz09CnYreG5CZz09CjAKNnRkZ3RjYXJua3ZwYmFoNnN6eHRlaHNwCjEyNy4wLjAuMQowCjExNTU3CgoxMTU1Nwo=|3",
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
     "SearchPhrase":"dog"
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
$results = exec($cmd);


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
				'title'    => $image['Title'], //[key( $image['stdClass'] )]['Title'],
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