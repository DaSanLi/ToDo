import { Module } from '@nestjs/common';
import { ReqTaskAuth } from '../task/scripts/task.types';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
    imports: [
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: join(process.cwd(), './src/graph-ql/schema.gql'),
            playground: false,
            sortSchema: true,
            plugins: [ApolloServerPluginLandingPageLocalDefault()],
            context: ({ req, res }: { req: ReqTaskAuth; res: any }) => ({ req, res }),
        }),
    ]
})
export class GraphQlModule {}


