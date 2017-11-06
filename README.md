# TO START

This app ->
1. **Clone the project**. `git clone [https://github.com/fullstacklabs/city-of-sac-client.git]`.
2. **Run the setup script**. `npm run setup`

Switch to API ->

1. Pull latest from fullstacklabs/Ohana-API
2. Setup the API `bin/setup`
3. Run `script/reset` to reset the DB and accept new data
4. Run `bin/rake create_categories` to import the taxonomies
5. Run `script/import` to import the parsed csvs into the DB
6. start api with `bundle exec puma -C ./config/puma.rb`
7. cd back to the client, start client `npm start`
8. go to http://localhost:3000/businesses


TO DEPLOY CLIENT APP ->
1. Verify that all tests are passing
2. Run `git push staging master`

TO RESET DB LOCALLY ->
```
$ rake db:drop
$ rake db:setup rake db:seed
$ bin/rake create_categories
$ script/import 0.3
$ bundle exec puma -C ./config/puma.rb
```

TO RESET STAGING DB ->
```
$ heroku pg:reset --confirm city-of-sac
$ heroku run rake db:migrate
$ heroku run rake db:seed
$ heroku run rake create_categories
$ heroku run script/import 0.3
```
