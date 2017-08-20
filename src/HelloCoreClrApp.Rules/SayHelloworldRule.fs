module HelloCoreClrApp.Rules.SayHelloWorldRule

let NegativeResult = "Are you sure?", false

let Process name = 
    match name with
    | null -> NegativeResult
    | "" -> NegativeResult
    | _ -> sprintf "Hello %s!" name, true
