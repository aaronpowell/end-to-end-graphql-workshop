import { GraphQLResolveInfo } from "graphql";
import { withFilter, ResolverFn, FilterFn } from "graphql-subscriptions";

declare module "graphql-subscriptions" {
  type withFilter = <
    TSource = unknown,
    TArgs = unknown,
    TContext = unknown,
    TReturn = unknown
  >(
    asyncIteratorFn: ResolverFn<TSource, TArgs, TContext, TReturn>,
    filterFn: FilterFn<TSource, TArgs, TContext>
  ) => ResolverFn<TSource, TArgs, TContext, TReturn>;

  type FilterFn<TSource = unknown, TArgs = unknown, TContext = unknown> = (
    rootValue?: TSource,
    args?: TArgs,
    context?: TContext,
    info?: GraphQLResolveInfo
  ) => boolean | Promise<boolean>;

  type ResolverFn<
    TSource = unknown,
    TArgs = unknown,
    TContext = unknown,
    TReturn = unknown
  > = (
    rootValue?: TSource,
    args?: TArgs,
    context?: TContext,
    info?: GraphQLResolveInfo
  ) => AsyncIterator<TReturn> | Promise<AsyncIterator<TReturn>>;
}
