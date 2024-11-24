# StoreAPI

## Naming Conventions

everything -> kebab?
tests -> pascalCase?

### Tasks

- [x] Handle Invalid URL / Create notFoundMiddleware
- [x] DB create user
- [x] register api -> response with success message.
- [x] DB find user by name
- [x] login endpoint -> response with success message and token.
- [ ] ENDPOINT register -> validations
- [ ]
- [ ]
- [ ]

### Tests

- [x] Test Invalid URL
- [x] Test DB create user -> Valid user.
- [x] Test ENDPOINT register
- [x] Test DB findUserByName
- [x] Test SERVICE isAvailable
- [x] Test SERVICE verifyUser
- [ ] Test SERVICE createToken
- [ ] Test ENDPOINT login
- [ ] Test DB findAllUsers
- [ ] Test ENDPOINT getAllUsers
- [ ] Test DB findUserById
- [ ] Test ENDPOINT getUserById
- [ ] Test DB create product
- [ ] Test ENDPOINT postProduct
- [ ] Test DB findAllProducts
- [ ] Test DB getAllProducts
- [ ] Test DB
- [ ]

### Possible enhancements or waste of time.

- Extract all queries from models folder to a repositories folder and create the repository pattern if things get messy.
- Create a custom validation middleware for each request with a body.
-
