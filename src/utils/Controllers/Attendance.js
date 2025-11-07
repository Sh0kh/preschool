import { $api } from "../Headers";

class AttendenceApi {
    static CreateAttendance = async (data) => {
        const response = await $api.post(`/attendance`, data)
        return response;
    }
    static GetAttendance = async () => {
        const response = await $api.get(`/attendance`)
        return response;
    }
}

export { AttendenceApi };