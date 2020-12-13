# AWS Serverless Capstone Project - Photo Orgainzer App Developed by Singlun

## Table of Contents

* [OverView](#OverView)
* [Setup Environment](#Setting-Environment)
* [Configuration For Production Mode](#Configuration-Production)
* [Configuration For Development/Offline Mode](#Configuration-Development)
* [Deploy Back-End Production](#Deploy-BackEnd-Production)
* [Deploy As Offline Mode](#Deploy-As-Offline-Mode)
* [Installation Front-End](#Installation-FrontEnd)
* [Run the App](#Run-App)
* [Project Reference Sources Or Links](#references)

## OverView

In this project, we will apply the skills we have acquired in this cloud engineering course to design, deploy and operate a AWS Serverless photo Organizer application. The App consist of two parts, a backend which is written in Nodejs and enitirely a `Labmda` serverless architecture. We will use the `Serverless` framework to deploy our Lambda fucntions. And the other part is the front-end which is written in React TypeScript. The main use of this App is to allow users to login to the system and upload their photos to different pre-defined categories/Groups. User requires to add a title and description for the photo they upload. The uploaded photos will be uploaded to the S3 Bucket and downloaded with a pre-signed URL. User can also delete the photos.

The App consist of two Modes, Production and Development/Offline Mode. For the Production Mode, all the data and photos are stored in to the AWS. Dynamodb, S3 Bucket will be the data and photo Repository. As for the Production Mode, It is not recommend for development and Integration Testing. For integration testing and development it is recommend to use the Development/Offline Mode. Both the backend and front-end need to make some cofiguration changes in order to suppport the developemnt Mode. Details will be descibe below.

For this project we will uses Oracle Vitualbox Virtual Machine for simulating the Linux development Environment. If you personally has a Linux Environment you can skip to part. 

## Setting-Environment

 * VirtaulBox Machine For Download
    * To install please follow the this link: https://www.virtualbox.org/wiki/Downloads. 

 * Ubuntu OS Dowload
    * Download the Ubuntu from the Ubuntu website: https://ubuntu.com/download, we will download the Ubuntu 18.0.4 desktop version.

 * Add Ubuntu OS to the Virtual Machine.
    1. From the VirtualBox click the `New` Button.
    2. For the name type in `photo-organizer`. For the type field select `Linux` and `Ubuntu 64-bit` for the Version.
    3. Leave Everthing as default. (You can adjust the Storage Space according to your needs).
    4. Then Click the `Setting` Button.
    5. Go to the `Storage` Section => For the `Controller IDE`, Select the Ubuntu OS Image you download.
    6.  Click the `Start` button to begin install the Ubuntu OS. Follow the setup instructions and install.

* Install Nodejs. 
    when you sucessfully install Nodejs, `npm (Node Package Manager)` will be installed as well.
    * To install Nodjs, please follow this link: https://nodejs.org/en/download/

* Install git 
    * sudo apt install git-all

* Install Serverless FrameWork 
    * npm install -g serverless
    * Config Serverless FrameWork. Type in the following command 
        * `serverless config credentials --provider aws --key AKIAIOSFODNN7EXAMPLE --secret wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY`
          Please substitute the --key and --secret with you own values.

* Clone the Project
    * Type in the following command to clone the Project.
      `git clone https://github.com/singlun/serverless-photo-organizer.git`  

And that is it! We have setup an environment for the Photo Organizer App. Next we will config the project for the Production Mode and deploy it to the AWS.


## Configuration-Production

In Order for the system to work as Production Mode. We need to modify the back-end `serverless.yml` file and front-end `config.ts` file.

*  Back-End
    * Browser to the location `serverless-photo-organizer/backend/serverless.yml`
    * The only place you need to modify is the `IS_OFFLINE` flag, which could be found in the `provider -> environment -> IS_OFFLINE`
    * As we are now setting up for Production , set the IS_OFFLINE flag to `False`.
*  Front-End
    * Browser to the location `serverless-photo-organizer/client/src/config.ts`
    * Please Comment the following line at line 23
      `//export const apiEndpoint = 'http://localhost:3005'`
    * At line 6, please chage it to 
      `export const stage = 'prod'`
      Because we are setting Production Environment so we chage it to `prod`.
    * For other fields Please substitude to your own Values.


## Configuration-Development

In Order for the system to work as Developemnt Mode. We need to modify the back-end `serverless.yml` file and front-end `config.ts` file.

*  Back-End
    * Browser to the location `serverless-photo-organizer/backend/serverless.yml`
    * The only place you need to modify is the `IS_OFFLINE` flag, which could be found in the `provider -> environment -> IS_OFFLINE` section.
    * As we are now setting up for Development , set the IS_OFFLINE flag to `True`.
*  Front-End
    * Browser to the location `serverless-photo-organizer/client/src/config.ts`
    * Please Comment the following lines
      `//const apiId = 'tee3bsyc5j'` at line 10
      `//export const apiEndpoint =  https://${apiId}.execute-api.us-east-2.amazonaws.com/${stage}` at line 11
    * Please UN-Comment the following line
      `export const apiEndpoint = http://localhost:3005` at line 23
    * At line 6, please chage it to 
      `export const stage = 'dev'`
      Because we are setting Development Environment so we chage it to `dev`.
    * For other fields Please substitude to your own Values.

## Deploy-BackEnd-Production

`Please Note you need to Config the settings for Production!`, please follow the above procedures.

*  Install All the Dependencies
    * Browser to the location `serverless-photo-organizer/backend`
    * Type in the following command `npm install`. Wait till the installation completes
*  Deploy the App to the AWS.
    * Browser to the location `serverless-photo-organizer/backend`
    * Type in the following command `sls deploy --stage prod -v`. Wait till the deployment completes.

## Deploy-Offline-Mode

`Please Note you need to Config the settings for Offline/Development!`, please follow the above procedures.

*  Install All the Dependencies
    * Browser to the location `serverless-photo-organizer/backend`
    * Type in the following command `npm install`. Wait till the installation completes
*  Install the dynamodb locally
    * Browser to the location `serverless-photo-organizer/backend`
    * Type in the following command `sls dynamodb install`. Wait till the installation completes   

## Installation-FrontEnd

*  Install All the Dependencies
    * Browser to the location `serverless-photo-organizer/client`
    * Type in the following command `npm install`. Wait till the installation completes


## Run-App

*  For Production 

   As the Backend is deploy to AWS. In-order to run the app. All we need is start-up the Front-End.
    * Browser to the location `serverless-photo-organizer/client`
    * type in the following command `npm run start` 
    * In the Browser type in the URL `http://localhost:3000/prod/login`.

*  For Offline/Development Mode 

   As the Backend is deploy locally. In-order to run the app. All we need is to start the dynamodb ,backend and front-end.
    * Browser to the location `serverless-photo-organizer/Backend`
    * For the first terminal type in the following command `sls offline` 
    * For the second terminal type in the following command `sls dynamodb start` 
    * FOr the third terminal. Browser to the location `serverless-photo-organizer/client` and type in the following command `npm run start` 
    * In the Browser type in the URL `http://localhost:3000/dev/login`.

## References

* Code References
    * [Udacity](https://www.udacity.com/)
    * [GitHub](https://github.com/)
    * [Serverless](https://serverless.com/)
    * [Binary responses with Serverless Framework and API Gateway](https://medium.com/nextfaze/binary-responses-with-serverless-framework-and-api-gateway-5fde91376b76)
    * [Serverless S3 Local](https://www.npmjs.com/package/serverless-s3-local)
    * [Serverless Apigw Binary](https://serverless.com/plugins/serverless-apigw-binary/)
    * [Express](https://expressjs.com/)
    * [Auth0](https://auth0.com/)
    * [JSON Web Tokens](https://jwt.io/)
