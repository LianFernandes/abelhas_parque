import { GoogleLoginResponse } from "react-google-login";

export class GoogleDto {
  public readonly id: string;
  public readonly email: string;
  public readonly role: string;
  public readonly token: string;
<<<<<<< HEAD
  public readonly type: 'google' | 'local';
=======
>>>>>>> c3acc1350dfcfcc2168e6cfe6d088851a117e517

  constructor(data: GoogleLoginResponse) {
    const profile = data.getBasicProfile();
    const id_token = data.getAuthResponse().id_token;
<<<<<<< HEAD
    console.log(profile);
    console.log(id_token);
=======
>>>>>>> c3acc1350dfcfcc2168e6cfe6d088851a117e517

    this.id = profile.getId();
    this.email = profile.getEmail();
    this.role = 'USER';
    this.token = id_token;
<<<<<<< HEAD
    this.type = 'google';
=======
>>>>>>> c3acc1350dfcfcc2168e6cfe6d088851a117e517
  }
}