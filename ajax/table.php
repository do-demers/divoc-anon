<?php  
 $message = '';  
 $error = '';  


function debug_to_console($data) {
     $output = $data;
     if (is_array($output))
         $output = implode(',', $output);
     echo "<script>console.log('Debug Objects: " . $output . "' );</script>";
 }

debug_to_console("submit is good");

if(file_exists('dispatchor_data.json')) {  

     debug_to_console("file exists");
     // echo $current_data;
     date_default_timezone_set('America/New_York');
     echo date_default_timezone_get();

     $current_data = file_get_contents('dispatchor_data.json');  
     $array_data = json_decode($current_data, true);  
     $extra = array(  
          'id'                =>   uniqid(),
          'date'              =>   date("F j, Y, g:i"),
          'APPL_IDs'          =>   $_POST["myData"]["APPL_IDs"]
     );  
     $array_data[] = $extra;  
     $final_data = json_encode($array_data);

     if(file_put_contents('dispatchor_data.json', $final_data))   {  
          debug_to_console("File Appended Success fully");
     }  
}  
else  {  

     debug_to_console("file does not exists");
     // $error = 'JSON File not exits';  
}  
debug_to_console("Test4");
 
 ?>  