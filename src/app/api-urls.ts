import { environment } from '../environments/environment';

export class ApiUrls {
    public static readonly API_ENDPOINT = `${environment.apiLink}/${environment.apiVersion}`;
    public static readonly LOGIN_ENDPOINT = 'login';
    public static readonly RIVERS_ENDPOINT = 'rivers';
    public static readonly RIVER_SECTIONS_ENDPOINT = 'riverSections';
    public static readonly MEASURING_POINTS_ENDPOINT = 'measuringPoints';
    public static readonly SUBSTANCE_ENDPOINT = 'substance';
}
