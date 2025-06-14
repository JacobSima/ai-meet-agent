import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import {
  AgentIdView,
  AgentViewIdError,
  AgentViewIdLoading
} from "@/modules/agents/ui/components/agent-id-view";

interface Props {
  params: Promise<{ agentId: string }>
};

const AgentIdPage = async ({ params }: Props) => {
  const { agentId } = await params;

  // prefetch agent data on server component mount.
  // this will be cache in the system
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.agents.getOne.queryOptions({ id: agentId }));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<AgentViewIdLoading />}>
        <ErrorBoundary fallback={<AgentViewIdError />}>
          <AgentIdView agentId={agentId} />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  );
};

export default AgentIdPage;
// localhost:3000/agents/123