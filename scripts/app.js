function hello()
{
    console.log("Hello here");
}

function main()
{
    console.log("hello in the main");
    hello();
}

window.onload = main;