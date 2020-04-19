<?php  
 $message = '';  
 $error = '';  

//  $file =  "xxx.json";
//  echo $file;

debug_to_console("start script");

 function debug_to_console($data) {
     $output = $data;
     if (is_array($output))
         $output = implode(',', $output);
 
     echo "<script>console.log('Debug Objects: " . $output . "' );</script>";
 }

 debug_to_console("Test");

     if(isset($_POST["submit"]))  {  
          // echo "submit is good \r\n";
          debug_to_console("submit is good");

          if(empty($_POST["firstName"])) {   
                    // echo "no firstName data\r\n";
                    debug_to_console("no firstName");
                    // $error = "<label class='text-danger'>Enter Name</label>";  
          }           
          else if(empty($_POST["lastName"]))  {  
               // echo "no lastName data\r\n";
               debug_to_console("no lastName");
               // $error = "<label class='text-danger'>Enter Gender</label>";  
          }  
          else if(empty($_POST["areaOfResidence"])) {  
               // echo "no areaOfResidence data\r\n";
               debug_to_console("no areaOfResidence");
               // $error = "<label class='text-danger'>Enter Designation</label>";  
          }  
          else {  
               debug_to_console("Test2");
               if(file_exists('dispatchor_data.json')) {  

                    debug_to_console("file exists");
                    // echo $current_data;

                    $current_data = file_get_contents('dispatchor_data.json');  
                    $array_data = json_decode($current_data, true);  
                    $extra = array(  
                         'id'                =>   uniqid(),
                         'time'              =>   date("Y/m/d"),
                         'firstName'         =>   $_POST['firstName'],  
                         'lastName'          =>   $_POST["lastName"],
                         'areaOfResidence'   =>   $_POST["areaOfResidence"],
                         'telephone'         =>   $_POST["telephone"],
                         'email'             =>   $_POST["email"],
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
          }  
          debug_to_console("Test4");
     }  
 ?>  