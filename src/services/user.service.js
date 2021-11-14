import http from "../http_common";

class UsersService{

    all(){
        return http.get("api/users/all");
    }

    delete(id){
        return http.delete(`api/users/delete/${id}`);
    }

    edit(id)
    {
        return http.get(`api/users/edit/${id}`);
    }
    
    save(data) {
        return http.put("api/users/save", data,
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }


}


export default new UsersService();