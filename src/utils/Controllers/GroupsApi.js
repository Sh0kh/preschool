import { $api } from "../Headers";

class GroupsApi {
    static GetAllGroups = async () => {
        const response = await $api.get("/group");
        return response;
    }
    static GetGroupDetails = async (id) => {
        const response = await $api.get(`/group/${1}/${id}/payment`);
        return response;
    }
    static GetGroupsChildren = async (id) => {
        const response = await $api.get(`/student/${1}/${id}`);
        return response;
    }
    static CreateGroup = async (data) => {
        const response = await $api.post("/group", data);
        return response;
    }
    static EditGroup = async (id, data) => {
        const response = await $api.put(`/group/${1}/${id}`, data);
        return response;
    }
    static DeleteGroup = async (id) => {
        const response = await $api.delete(`/group/${1}/${id}`);
        return response;
    }
    static addGroups = async (data) => {
        const response = await $api.post(`/student-group`, data);
        return response;
    }
}
export { GroupsApi }