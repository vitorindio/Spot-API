import Route from '@ioc:Adonis/Core/Route'

// TODO: Adicionar middleware: apenas administradir pode registrar usuários
Route.post('/admin/register', 'Users/Register.store')
Route.get('/admin/register/:key', 'Users/Register.show')
Route.put('/admin/register', 'Users/Register.update')
