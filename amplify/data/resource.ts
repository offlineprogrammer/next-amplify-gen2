import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
import { post } from "aws-amplify/api";
import { postConfirmation } from "../auth/post-confirmation/resource";

const schema = a
  .schema({
    Todo: a
      .model({
        name: a.string(),
        description: a.string(),
      })
      .authorization((allow) => [allow.publicApiKey()]),
    UserProfile: a
      .model({
        email: a.string(),
        profileOwner: a.string(),
      })
      .authorization((allow) => [
        allow.owner(),
        allow.ownerDefinedIn("profileOwner"),
      ]),
  })
  .authorization((allow) => [allow.resource(postConfirmation)]);
export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});
