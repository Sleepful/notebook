# elixir

maps do not offer protection from bad keys at compilation time, only at runtime do they throw an error.

structs do offer protection from bad keys at compilation

## Maps
like js objects, have the funn %{} syntax

    %{user: "jose"}

act like dynamic types

## Structs
like a typescript object type

    defmodule User do
        defstruct [:user]
    end
    %User{user: "jose"}

    
act like static types
they are maps with a `__struct__` prop

## Matching

matching params by key, like destructuring:

    def foo(%{"key" => var})

hello
