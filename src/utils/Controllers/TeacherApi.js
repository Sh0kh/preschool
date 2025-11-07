import { $api } from "../Headers";

class TeacherApi {
    static TeacherGetAll = async () => {
        const response = await $api.get("/employee");
        return response;
    }
    static GetChildrenDetail = async (id) => {
        const response = await $api.get(`/student/${1}/${id}`);
        return response;
    }
    static CreateTeacher = async (data) => {
        const response = await $api.post("/employee", data);
        return response;
    }
    static EditTeacher = async (id, data) => {
        const response = await $api.put(`/employee/${1}/${id}`, data);
        return response;
    }
    static DeleteTeacher = async (id) => {
        const response = await $api.delete(`/employee/${1}/${id}`);
        return response;
    }
    static addTeacher = async (data) => {
        const response = await $api.post(`/employee-group`, data);
        return response;
    }
}
export { TeacherApi }