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
- [x] SERVICE Authentication isAvailable
- [x] SERVICE Authentication verifyUser
- [x] SERVICE Authentication createToken
- [ ] ENDPOINT GET user ->findAll -- req token
- [ ] ENDPOINT GET user/:id -> findId -- req token
- [ ] ENDPOINT POST user -> Create -- req token
- [ ] ENDPOINT GET product -> findAll
- [ ] ENDPOINT GET product/:id -> findId
- [ ] ENDPOINT POST product -> Create -- req token
- [ ] ENDPOINT GET order -> findAll
- [ ] ENDPOINT GET order/:id -> findId
- [ ] ENDPOINT POST order -> Create -- req token
- [ ] SQL order_products join table. Many-to-Many
- [ ] VALIDATION register
- [ ] VALIDATION login

### Tests

- [x] Test Invalid URL
- [x] Test DB create user -> Valid user.
- [x] Test ENDPOINT register
- [x] Test DB findUserByName
- [x] Test SERVICE verifyUser
- [x] Test ENDPOINT login
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
- Refactor DB Tests and start using spyOn and sql files to populate the DB before testing.
