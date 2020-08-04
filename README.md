# :pill: NTUA-Appathon - Statistical Analysis on the GTOV Dataset

Semester project on the Internet and Applications class @ ECE-NTUA.

## :memo: Description

Web application for parsing xml files and finding the top 10 drugs used for curing a user specified disease. 

Using the XML datasets from https://clinicaltrials.gov/ the web app receives a disease as input and after parsing the data outputs the most commonly used drugs for that particular disease using the <intervention> XML identifier.

## :heavy_plus_sign: Application dependencies

This application is dependent on the Node Javascript runtime environment, the node package manager(npm) as well as the React Javascript framework.

## :hammer: Running the server

On the server folder run: ```node server.js```

## :wrench: Deploying the client

To install the client dependencies of the react framework on the client folder run: ```npm install```

After the required dependencies are installed we can deploy the client by running: ```npm start```

## :heavy_check_mark: Technologies used:

Frontend: Javascript, React, socket.IO, HTML, CSS

Backend: Javascript, express, socket.IO, Node.JS
