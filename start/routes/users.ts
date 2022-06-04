import Route from '@ioc:Adonis/Core/Route'

// TODO: Adicionar middleware: apenas administrador pode registrar usuários
Route.post('/admin/register', 'Users/Register.store').middleware('auth')
Route.get('/admin/register/:key', 'Users/Register.show')
Route.put('/admin/register', 'Users/Register.update')

Route.post('/users/forgot-password', 'Users/ForgotPassword.store')
Route.get('/users/forgot-password/:key', 'Users/ForgotPassword.show')
Route.put('/users/forgot-password', 'Users/ForgotPassword.update')

Route.get('/users', 'Users/Main.show').middleware('auth')
Route.put('/users', 'Users/Main.update').middleware('auth')
