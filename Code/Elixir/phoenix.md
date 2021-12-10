# Phoenix

## Conventions

user string keys for entry/end points, atoms elsewhere
because something soemthing atom key doesn't get GC

## Tips

### iex

for running `iex` with a phoenix project:

`$ iex -S mix`

the `-S mix` bit tells it to run the `iex` in the context of `mix` script

### routes

phx.routes

resources route macro:
get    "/resources"          , controller , :index
get    "/resources/:id/edit" , controller , :edit
get    "/resources"          , controller , :new
get    "/resources"          , controller , :show
post   "/resources"          , controller , :create
patch  "/resources/:id"      , controller , :update
put    "/resources/:id"      , controller , :update
delete "/resources/:id"      , controller , :delete

## Creating project

$ mix phx.new project_name

folders:

`/assets`
browser files like CSS and JS

`/config`

`/lib/project_name.ex`
empty for documentation

`/lib/project_name`
main application logic

`/lib/project_name_web`
web-related logic (controllers, views, templates)

`/lib/project_name_web/endpoint.ex`
entry point for requests

`/lib/project_name_web/router`
importants routing, usually calls the controller actions

## Controllers

Contain actions to act upon after a request has been routed (by router and whatnot). Then controllers may do things like render an html view ...

wires up context (like classes) and renders things (with views)

### actions

actions get the connection passed and the params

## Views

Rendering functions, which convert data into the service format (html, json...)
They are "just a module"
A view extracts templates and make them into a function of themselves

## Templates

The templating language thingy
They are "just functions"

### Layouts

Basically a tempalte with `@inner_content`

## Contexts

Encapsulates related functions, like a class?

## Flow

`endpoint.ex` |> 
`router.ex` |>
    get "/url-path", `ModuleController`, `:action`
`module_controller.ex` |>
    defmodule `ProjectModule.ModuleController` do
    use ProjectModule, :controller (api to use)
    alias ProjectModule.Context (`context.ex`)
    `action`(conn, %{"id" => id}) |>
        data = Context.foo() |>
            (context is like a service or class)
        render(conn, templateName, params) |>
`templates/module/` |>
    `action.html.eex` |> 
    <=% foos(@params.id) %> |>
    <=% render "name.html", params: @params %> |>
`module_view.ex` |>
    defmodule `ProjectModule.ModuleView` do
    use RumblWeb, :view
    alias Rumbl.Accounts
    def foos(params) do
        formats thingies for the template
    end
    // IMPLICIT! templates are functions in views
    render(template_name,assigns)
        (pattern match on name of template)
        

## Ecto

### schema

schema "name" do 
    field :name, :string
end

specify struct and schena at same time db

### migration

$ mix ecto.gen.migration create_users
// code changes
$ mix ecto.migrate

works on current ENV

ENV is set with system-wide MIX_ENV


# OTP

## Services
OTP supervised processes go inside "children" array in:
`rumbl/lib/rumbl/application.ex`

### deps
`mix deps.get`
