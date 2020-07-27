const axios = require('axios');

class Api {

    url = {
        dev: process.env.BACKEND_URL,
        release: 'https://colocar api final'
    }

    constructor() {
        this.api = axios.create({ baseURL: this.url.dev, proxy: false })
    }


    headers(token) {
        return { Authorization: `Bearer \"${token}\"` }
    }
    /**
     * 
     * Auth
     */

    // Faz o login do user
    async login({ body }) {
        console.log('Result', navigator.vibrate(10));
        const result = await this.api.post(`/auth/session`, body)
        return result.data
    }

    // Faz o cadastro do user
    async register({ body }) {
        const result = await this.api.post(`/register`, body)
        return result.data
    }

    // Pegar dados do user
    async show(token) {
        const headers = this.headers(token)
        const result = await this.api.get(`/auth/myUser`, { headers })
        return result.data
    }

    // Atualizar dados do user
    async update(token, body) {
        const headers = this.headers(token)
        const result = await this.api.put(`/auth/update`, body, { headers })
        return result.data
    }

    /**
     * Users
     */

    // Pegar lista de usuarios
    async fetchUsers(token, page, limit, search) {
        const headers = this.headers(token)
        const result = await this.api.get(`/user/index?page=${page}&RowsPerPage=${limit}&search=${search ?? ""}`, { headers })
        return result.data
    }

    // Pegar lista de usuarios
    async showUser(token, id) {
        const headers = this.headers(token)
        const result = await this.api.post(`/showUser/${id}`, null, { headers })
        return result.data
    }

    // Atualizar dados do user
    async updateAdm(token, body, id) {
        const headers = this.headers(token)
        const result = await this.api.post(`/user/update/${id}`, body, { headers })
        return result.data
    }

    /**
     * Images
     */

    // Faz o login do user 
    async getImage({ token, id }) {
        const headers = this.headers(token)
        const response = await this.api.get(`/file/show?path=${id}`, { headers, responseType: 'arraybuffer' })
        let data = `data: ${
            response.headers["content-type"]
            }; base64, ${new Buffer(response.data, "binary").toString("base64")} `;
        return data
    }

    // Pegar lista de imagens
    async fetchImages(token, page, limit) {
        const headers = this.headers(token)
        const result = await this.api.post(`/images/index`, { page, limit }, { headers })
        return result.data
    }

    /**
    * 
    * Notification
    */

    // Atualizar dados do user
    async fetchNotification(token, page, limit) {
        const headers = this.headers(token)
        const result = await this.api.post(`/notification/index`, { page, limit }, { headers })
        return result.data
    }

    // Atualizar dados do user
    async storeNotification(token, body) {
        const headers = this.headers(token)
        const result = await this.api.post(`/notification/store`, body, { headers })
        return result.data
    }

    // Atualizar dados do user
    async MyNotifications(token, page, limit, search) {
        const headers = this.headers(token)
        const result = await this.api.get(`/notification/MyNotifications?page=${page}&RowsPerPage=${limit}`, { headers })
        return result.data
    }

    /**
 * 
 * Logs
 */

    // Pegar dados de log
    async fetchLog(token, page, limit, search) {
        const headers = this.headers(token)
        const result = await this.api.get(`/logs/index?page=${page}&RowsPerPage=${limit}&search=${search ?? ""}`, { headers })
        return result.data
    }

    // // Atualizar dados do user
    // async storeNotification(token, body) {
    //     const headers = this.headers(token)
    //     const result = await this.api.post(`/notification/store`, body, { headers })
    //     return result.data
    // }

    // // Atualizar dados do user
    // async MyNotifications(token, body) {
    //     const headers = this.headers(token)
    //     const result = await this.api.get(`/notification/MyNotifications`, { headers })
    //     return result.data
    // }



}

export default new Api();
