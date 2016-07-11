module HelloWorldApp.GetHelloWorldRule

let Process name = 
    match name with
    | null -> "Are you sure?", false
    | "" -> "Are you sure?", false
    | _ -> sprintf "Hello %s!" name, true
