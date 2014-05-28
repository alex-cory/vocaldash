<?php
$cmd ='
curl -# -H "Content-Type: application/json" -X POST -g  -d \'{
 "RequestHeader":{
   "Token":"fn2fW9jHrdJjGRewsIAewDi8yYYrackL2lqV7kZpyu48uUyJSA4tVCPFfNPIWoNAZNLJYv5VJAG9P5AhxKl65VeT50pAvT2/8fSoF/P1FVVYuAzaz60HvEqtY/55uqAgTms8TPtJk2AByzSQ0eefWs5GUm0uPQG9/R5DLhbxuP8=|77u/citlQ3l5TnJia0J3V3o2TFFwVkkKMTE1NTcKCkR2Sm5CZz09CkZ2bG5CZz09CjAKNnRkZ3RjYXJua3ZwYmFoNnN6eHRlaHNwCjEyNy4wLjAuMQowCjExNTU3CgoxMTU1Nwo=|3",
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
     "SearchPhrase":"'. $_GET['filter'].'"
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