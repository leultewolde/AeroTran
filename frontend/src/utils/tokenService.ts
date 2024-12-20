import * as jwt from 'jsonwebtoken';
import {Role} from "@/types/api/users";

/*
*
* {
* "header":{"alg":"HS512"},
* "payload":{
* "authorities":"ROLE_REGULAR",
* "sub":"6",
* "iat":1734642113,
* "exp":1734685313},
* "signature":"43YajQXkgXTL9g-vj93UgX-G_UU-Kw0Iun-Hy6OYer5thLTnDf5pJg1AMfWLDSVx3rcTpWJXWFX0SN1XWWVh0g"
* }
*
* */

interface CustomJwtPayload extends jwt.JwtPayload {
    authorities?: string; // Add 'authorities' property
}

// Define the type for the decoded token
type DecodedToken = {
    header: jwt.JwtHeader;
    payload: CustomJwtPayload;
    signature: string;
};

function removeRolePrefix(role: string|undefined): string {
    if (!role) {
        throw new Error('Role is null');
    }
    if (!role.startsWith('ROLE_')) {
        throw new Error('Invalid role format');
    }
    return role.replace(/^ROLE_/, '');
}

function getRoleFromString(value: string|null): Role | null {
    if (!value) return null;
    return Object.values(Role).includes(value as Role) ? (value as Role) : null;
}

function toNumber(value: string | null): number | null {
    const num = value !== null ? Number(value) : null;
    return num !== null && !isNaN(num) ? num : null;
}

const decodeToken = (token: string): DecodedToken | null => {
    const decoded = jwt.decode(token, {complete: true});
    if (decoded) {
        return decoded as DecodedToken;
    }
    return null;
}

export const setAuthorization = (token: string) => {
    const decoded = decodeToken(token);
    if (decoded) {
        setToken(token);
        setRole(removeRolePrefix(decoded.payload.authorities));
        setUserId(decoded.payload.sub);
    }
};

const setToken = (token: string) => {
    if(token.length > 0) localStorage.setItem('accessToken', token);
};

const setRole = (role: string|undefined) => {
    if(role && role.length > 0) localStorage.setItem('userRole', role);
}
const setUserId = (userId: string|undefined) => {
    if(userId && userId.length > 0) localStorage.setItem('userId', userId);
}

export const getToken = ():string|null => {
    return localStorage.getItem('accessToken');
};

export const getRole = ():Role|null => {
    return getRoleFromString(localStorage.getItem('userRole'));
};

export const getUserId = ():number|null => {
    return toNumber(localStorage.getItem('userId'));
};

const removeToken = () => {
    localStorage.removeItem('accessToken');
};

const removeRole = () => {
    localStorage.removeItem('userRole');
};

const removeUserId = () => {
    localStorage.removeItem('userId');
};


export const removeAuthorization = () => {
    removeToken();
    removeRole();
    removeUserId();
}