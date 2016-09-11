# user-api

##How to run

1. Install Mongo

    Mongo will need to be installed and the Mongo service running.

2. I have used some es6 features so switch to using node >= 4.0.0

  `$ nvm use v4.0.0` (or whichever version you like)

3. Install dependencies

  `$ npm install`

4. Populate the database with the sample user data

  `$ npm run populate-db`

5. Start the server

  `$ npm start`

##How to run tests

1. Make sure database is populated with data so run `$ npm run populate-db` if you haven't done so.

2. `$ npm run test-integration`

## The API

The user-api is a ReST API with CRUDL features. I recommend using [Postman](https://www.getpostman.com/) to test the API

###Read

Resources are identified using the users `username` property. So to get the User with the username `tinywolf709`:

- ` GET http://localhost:3000/user/tinywolf709`

###Create

To create a User the only requirement is that the User has a `username` property and the `username` is unique. So to create a User:

- `POST http://localhost:3000/user`

With a JSON User payload:

```
{
    "gender": "male",
    "name": {
      "title": "Mr",
      "first": "John",
      "last": "Smith"
    },
    "location": {
      "street": "Council Chambers street",
      "city": "New Vegas",
      "state": "Great statesville",
      "zip": 1234
    },
    "email": "john.smith@example.com",
    "username": "smithy47",
    "password": "yourock123",
    "salt": "lypI10wj",
    "md5": "bbdd6140e188e3bf68ae7ae67345df65",
    "sha1": "4572d25c99aa65bbf0368168f65d9770b7cacfe6",
    "sha256": "ec0705aec7393e2269d4593f248e649400d4879b2209f11bb2e012628115a4eb",
    "registered": 545846587468,
    "dob": 932871968,
    "phone": "031-541-9181",
    "cell": "081-647-4650",
    "PPS": "3302243T"
  }
  ```
  
  The newly created record will be returned.
  
###Update

Again resources are identified using the users `username` property. So to update our new Users address:

- ` PUT http://localhost:3000/user/smithy47`

with a JSON payload with the new address property:

```
{
    "location": {
      "street": "Palace road",
      "city": "London",
      "state": "Winchesterton",
      "zip": 3456
    }
}
  ```

###Delete

To delete our new user:

- `DELETE http://localhost:3000/user/smithy47`

###List

To list all the users:

- `GET http://localhost:3000/users`

###Sort

We can sort the results from the list endpoint by adding the `sort` query parameter:


- Ascending: `GET http://localhost:3000/users/?sort=username`

- Or add a minus character for descending: `GET http://localhost:3000/users/?sort=-username`

###Filtering

The data returned from the list endpoint can be filtered as well.
The construct of a filter is based on the [odata](http://www.odata.org/documentation/odata-version-3-0/url-conventions/) convention:

`filter=Name eq 'Milk'`

Where the path, comparator operator and value are separated by spaces.

I am exposing the mongo comparator operators

```
$eq	Matches values that are equal to a specified value.
$gt	Matches values that are greater than a specified value.
$gte	Matches values that are greater than or equal to a specified value.
$lt	Matches values that are less than a specified value.
$lte	Matches values that are less than or equal to a specified value.
$ne	Matches all values that are not equal to a specified value.
$in	Matches any of the values specified in an array.
$nin	Matches none of the values specified in an array.
```

So a filter on the user-api will look like 

To list all the female users:

- `GET http://localhost:3000/users/?filter=gender $eq female`

###Sort and filter

- `http://localhost:3000/users/?filter=gender $eq female&sort=username`
