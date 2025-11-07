import { $api } from "../Headers";

class PaymentApi {

    static CreatePayment = async (data) => {
        const response = await $api.post("/payment", data);
        return response;
    }

}
export { PaymentApi }