import { GoogleLoginResponse } from "react-google-login";

export class GoogleDto {
  public readonly id: string;
  public readonly email: string;
  public readonly role: string;
  public readonly token: string;

  constructor(data: GoogleLoginResponse) {
    const profile = data.getBasicProfile();
    const id_token = data.getAuthResponse().id_token;

    this.id = profile.getId();
    this.email = profile.getEmail();
    this.role = 'USER';
    this.token = id_token;
  }
}