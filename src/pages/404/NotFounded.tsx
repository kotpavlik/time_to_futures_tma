import { useLocation } from "@solidjs/router";
import { Component } from "solid-js";

export const NotFounded: Component = () => {

    const location = useLocation()
    console.log(location.pathname)
    return (
        <div> pu pu pu 404:not founded</div>
    )
}

