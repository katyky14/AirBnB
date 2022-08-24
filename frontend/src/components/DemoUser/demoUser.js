import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";



function DemoUser() {
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        const credential = "luffy@user.io"
        const password = 'password'
        return dispatch(sessionActions.login({ credential, password}))
    }

    return (
        <form onSubmit={handleSubmit}>
            <button type="submit">Demo User</button>
        </form>

    )
}

export default DemoUser;
