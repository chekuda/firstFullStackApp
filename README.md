# VeOptimaser

##BackEnd
	- Configuration file 
		1- For token and masster Acc
	- NodeJS
		1-API
			-Modules
				1- Users:
					-Controllers:
						a- Middlewares for route the services
					-Services:
						a- AuthenticationToken: Check the token for the client from sessionStore before status change of page
						b- createToken: Create token for longer client session
						c- CreateUser:
						d- DeleteUser:
						e- getUsersfromDB: Request all the users from DB
						f- login: Filter the users from DB as the value coming from Frontend
						g- storeUserToDB: 
				2-ImagesHandler:
					-Controllers
						a- Middlewares for route the services
					-Services
						a- getOmagesfromdb: Request all the images from the DB(Front end will filter them up)
						b- insertimages: API for administrator upload images into the DB.
				3-payment(paypal):
					-Controllers
						a- Middlewares for route the services
					-Services
						a- executepayment: for execute the payment after the aprovation of the client
						b- paymentbypaypal: create a payment
			
	- NPM
		1- Installing the modules
	- Express
		1- Server required
		2- Request required
	- MYSQL
		1- DB (inserted into the services)
	- NodeMon
		1- Runing the server

##FrontEnd
	- HTML
	- CSS
	- JS
	- Angular
		-UIRouter for router(depending of the state of the page it will do an action)
	- Bootstrap