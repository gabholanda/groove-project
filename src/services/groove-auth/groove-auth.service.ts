import { Injectable, HttpService } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class GrooveAuthService {
    constructor(private httpService: HttpService) { }

    login(): Observable<any> {
        return this.httpService
            .post(
                `${process.env.GROOVE_URL}auth/login`,
                {
                    username: `${process.env.GROOVE_USERNAME}`,
                    password: `${process.env.GROOVE_PASSWORD}`
                })
            .pipe(
                map(response => response.data)
            )
    }

    async sign(key: number, name: string, token: string): Promise<any> {
        const headersRequest = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        };
        const entity = { costumer_key: key, customer_name: name }
        const response = await this.httpService
            .post(`${process.env.GROOVE_URL}sign`, { entity }, { headers: headersRequest }).toPromise();
        return response.data;
    }
}
