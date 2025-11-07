import { $api } from "../Headers";

class ChildrenApi {
    static GetAllChildren = async () => {
        const response = await $api.get("/student");
        return response;
    }
    static GetChildrenDetail = async (id) => {
        const response = await $api.get(`/student/${1}/${id}`);
        return response;
    }
    static CreateChildren = async (data) => {
        const response = await $api.post("/student", data);
        return response;
    }
    static EditChildren = async (id, data) => {
        const response = await $api.put(`/student/${1}/${id}`, data);
        return response;
    }
    static DeleteChildren = async (id) => {
        const response = await $api.delete(`/student/${1}/${id}`);
        return response;
    }
}
export { ChildrenApi }