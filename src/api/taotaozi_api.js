import { POST, GET } from './api';
export default {
    test(data) {
        const url = 'app/article';
        return POST(url,data);
    }
}