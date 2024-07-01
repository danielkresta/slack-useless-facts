// this file defines the CDK constructs we want to deploy

import { App, Stack, StackProps } from "aws-cdk-lib";
import { Rule, Schedule } from "aws-cdk-lib/aws-events";
import { LambdaFunction } from "aws-cdk-lib/aws-events-targets";
import { Function, Runtime, Code } from "aws-cdk-lib/aws-lambda";

const app = new App();

// define stack
class SlackNotificationStack extends Stack {
  constructor(scope?: App, id?: string, props?: StackProps) {
    super(scope, id, props);

    const lambda = new Function(this, "SlackUselessFactStack", {
      runtime: Runtime.NODEJS_20_X,
      code: Code.fromAsset("deploy"),
      handler: "app.handler",
    });

    const rule = new Rule(this, "SlackUselessFactRule", {
      schedule: Schedule.cron({ minute: "0", hour: "8" }),
    });

    rule.addTarget(new LambdaFunction(lambda));
  }
}

// instantiate stack
new SlackNotificationStack(app, "SlackUselessFactStack");
