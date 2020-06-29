
const createRequestURL = () => {
    let baseUrl = process.env.REACT_APP_REST_API_ROUTE;

    return baseUrl;
}


export const get = async (route, options) => {
    let url = createRequestURL();
    const response = await fetch(url + route, {
        mode: 'cors',
        ...options
    })

    return await response.json()
}

export const deleteMethod = async (route, options) => {
    let url = createRequestURL();
    const response = await fetch(url + route, {
        method: 'delete',
        mode: 'cors',
        ...options
    })

    return await response.json()
}


export const post = async (route, body, options) => {
    const url = createRequestURL();
    const response = await fetch(url + route, {
        method: 'post',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
        ...options
    })

    return await response.json()
}

export const put = async (route, body, options) => {
    const url = createRequestURL();
    const response = await fetch(url + route, {
        method: 'put',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
        ...options
    })

    return await response.json()
}
