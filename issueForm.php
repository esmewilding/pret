<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Productivity Calculater</title>
        <link rel="icon" type="image/x-icon" href="favicon.ico"/>
        <link rel="stylesheet" href="css.css">
    </head>

    <body>
        <a href="index.html">🔙 Back to calculater</a>

        <div id="header">
            <h1>How to use this website</h1>
        </div>

        <div>
            <p>
                <ol>
                    <li>In the field labelled start time, enter the time you started working on your first product. This should be in 24 hour format.</li>
                    <li>In the field labelled end time, enter the time you completed packaging and labelling your final product. This also should be in 24 hour format.</li>
                    <li>In the final field enter the time that it is predicted to take to complete all assigned products.</li>
                    <li>Click the calculate button.</li>
                </ol>
            </p>
        </div>

        <h2>Report an Issue</h2>
        <p>
            <form action="issueForm.php" method="POST" id="reportForm">
                <textarea name="issueDescription" required><?php echo $_POST['issueDescription'];?></textarea>
                <br>
                <input type="submit" value="Submit"/>
            </form>
        </p>

        <p id="footerMenuP"></p>

        <script src="js.js"></script>
        <script src="document.js"></script>
    </body>
</html>

<?php
// https://www.geeksforgeeks.org/php/how-to-insert-form-data-into-database-using-php/

    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "issues";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Collect and sanitize form data
    $issueDescription = mysqli_real_escape_string($conn, $_POST['issueDescription']);


    // Insert data into database
    $sql = "INSERT INTO issuesDB (issue_description) 
            VALUES ('$issueDescription')";
    if ($conn->query($sql) === TRUE) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    // Close the connection
    $conn->close();
?>