# StoreAPI

## Naming Conventions

everything -> kebab?
tests -> pascalCase?

### Tasks

- [x] Handle Invalid URL / Create notFoundMiddleware
- [x] DB create user
- [x] register api -> response with success message.
- [x] DB find all users
- [x] DB find user by name
- [x] DB find user by id
- [x] DB remove user by id
- [x] DB remove user by name //for tests
- [x] login endpoint -> response with success message and token.
- [x] SERVICE Authentication isAvailable
- [x] SERVICE Authentication verifyUser
- [x] SERVICE Authentication createToken
- [x] ENDPOINT GET user ->findAll -- req token
- [x] ENDPOINT GET user/:id -> findId -- req token
- [x] ENDPOINT DELETE user/:id -> findId -- req token
- [x] DB MIGRATE Product
- [x] DB MIGRATE Order
- [x] DB MIGRATE order_products join table. Many-to-Many
- [x] DB Product create -- req token
- [x] DB Product find all
- [x] DB Product find by id
- [x] DB order create -- req token
- [x] DB order find all -- req token
- [x] DB order find by id -- req token
- [x] ENDPOINT GET product -> findAll
- [x] ENDPOINT GET product/:id -> findId
- [x] ENDPOINT POST product -> Create -- req token
- [ ] ENDPOINT GET order/active/ -> current order --req token
- [ ] ENDPOINT GET order/complete/ -> completed orders --req token
- [ ] ENDPOINT POST order -> Create -- req token
- [ ] VALIDATION register
- [ ] VALIDATION login
- [ ] ENDPOINT POST user -> Create -- req token
- [ ] ENDPOINT PUT user -> Update -- req token
- [ ] ENDPOINT DELETE user -> DELETE -- req token

### Tests

- [x] Handle Invalid URL / Create notFoundMiddleware
- [x] DB create user
- [x] register api -> response with success message.
- [ ] DB find all users
- [ ] DB find user by name
- [ ] DB find user by id
- [ ] DB remove user by id
- [ ] DB remove user by name //for tests
- [ ] login endpoint -> response with success message and token.
- [ ] SERVICE Authentication isAvailable
- [ ] SERVICE Authentication verifyUser
- [ ] SERVICE Authentication createToken
- [ ] ENDPOINT GET user ->findAll -- req token
- [ ] ENDPOINT GET user/:id -> findId -- req token
- [ ] ENDPOINT DELETE user/:id -> findId -- req token
- [ ] DB Product create -- req token
- [ ] DB Product find all
- [ ] DB Product find by id
- [ ] ENDPOINT GET product -> findAll
- [ ] ENDPOINT GET product/:id -> findId
- [ ] ENDPOINT POST product -> Create -- req token
- [ ] ENDPOINT GET order -> findAll
- [ ] ENDPOINT GET order/:id -> findId
- [ ] ENDPOINT POST order -> Create -- req token
- [ ] VALIDATION register
- [ ] VALIDATION login
- [ ] ENDPOINT POST user -> Create -- req token
- [ ] ENDPOINT PUT user -> Update -- req token
- [ ] ENDPOINT DELETE user -> DELETE -- req token

### Possible enhancements or waste of time.

- Extract all queries from models folder to a repositories folder and create the repository pattern if things get messy.
- Create a custom validation middleware for each request with a body.
-

### Challenges:

- Writing tests. What to test? How to test? I have spent a lot of time deleting and rewriting tests more than coding this far.
- I need to figure out how to create better tasks and slot time for them cause jumping between tasks has been a time leak in my coding.
- Finding best practices.
