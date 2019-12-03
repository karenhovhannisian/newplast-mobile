import * as axios from "axios";
import constants from "../configs/contsants"

export default class NewPlastApi {
    static getProducts(){
        return axios(`${constants.apiUrl}/`)
    };

    static createLogin(){
        return axios(`${constants.apiUrl}/`)
    }

    static getPrice(productId, size){
        return axios.post(`http://109.75.42.220/service.php?sl=j,WKaren,wkaren,apr_sgin, where psize=${size} and p.products_id=${productId}`);
    }
 }
