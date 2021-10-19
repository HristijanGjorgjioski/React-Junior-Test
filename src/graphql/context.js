import React from 'react';
import { client } from "@tilework/opus";

// Client Config
const GRAPHQL_ENDPOINT = "http://localhost:8000";
client.setEndpoint(GRAPHQL_ENDPOINT);

export const GraphqlClientContext = React.createContext();
export const opusClient = client;