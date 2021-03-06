import { environment } from '../environments/environment';

export class ApiUrls {
    public static readonly API_ENDPOINT = `${environment.apiLink}`;
    public static readonly LOGIN_ENDPOINT = 'auth/login';
    public static readonly RIVERS_ENDPOINT = 'rivers';
    public static readonly USERS_ENDPOINT = 'users';
    public static readonly RIVER_SECTIONS_ENDPOINT = 'riverSections';
    public static readonly MEASURING_POINTS_ENDPOINT = 'measuringPoints';
    public static readonly SUBSTANCE_ENDPOINT = 'substances';
    public static readonly REAL_MEASURES_ENDPOINT = 'realMeasures';
    public static readonly RESEARCH_ENDPOINT = 'research';
}
