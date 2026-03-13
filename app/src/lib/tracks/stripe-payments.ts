import { Track } from '../types';

export const stripePaymentsTrack: Track = {
  id: "stripe-payments",
  title: "Stripe Payments & Financial APIs",
  color: "#635BFF",
  subtitle: "Master Stripe's payment infrastructure -- from PaymentIntents and Checkout to webhooks, Connect platforms, and PCI compliance",
  icon: "💳",
  version: "1.0.0",
  lastUpdated: "2026-03-13",
  tags: ["stripe", "payments", "fintech", "webhooks"],
  chapters: [
    {
      id: "stripe-ch1",
      title: "Chapter 1 -- Payment Intents & Checkout",
      lessons: [
        {
          id: "stripe-1-1",
          title: "PaymentIntents, Checkout Sessions & Payment Methods",
          duration: 65,
          type: "Domain",
          bloomLevel: "Apply",
          learningObjectives: [
            "Create and confirm a PaymentIntent using the Stripe Node.js SDK with correct parameters for amount, currency, and payment method types",
            "Differentiate between Stripe Checkout Sessions and custom PaymentIntent flows, and recommend the appropriate approach based on merchant requirements",
            "Troubleshoot common PaymentIntent failures including authentication_required, card_declined, and insufficient_funds status codes"
          ],
          commonMisconceptions: [
            {
              wrong: "You can capture a PaymentIntent immediately after creation without the customer confirming it",
              why: "Developers confuse automatic vs manual capture and skip the client-side confirmation step, leading to payments stuck in 'requires_confirmation' status",
              correct: "A PaymentIntent follows a lifecycle: created → requires_payment_method → requires_confirmation → requires_action (if 3DS) → processing → succeeded. The client must confirm the intent using stripe.confirmPayment() on the frontend before capture can occur.",
              codeExample: "// WRONG: Creating and immediately trying to capture\nconst pi = await stripe.paymentIntents.create({ amount: 2000, currency: 'usd' });\nawait stripe.paymentIntents.capture(pi.id); // Error: intent is not capturable\n\n// CORRECT: Create with confirmation on client side\nconst pi = await stripe.paymentIntents.create({\n  amount: 2000,\n  currency: 'usd',\n  payment_method_types: ['card'],\n});\n// Then on client: stripe.confirmCardPayment(pi.client_secret, { payment_method: ... })"
            },
            {
              wrong: "Stripe Checkout and PaymentIntents are completely separate systems -- you pick one or the other and they never interact",
              why: "The naming suggests they are independent products, but Checkout Sessions actually create PaymentIntents under the hood",
              correct: "A Checkout Session is a higher-level abstraction that creates and manages a PaymentIntent (or SetupIntent, or Subscription) automatically. After a successful Checkout Session, you can retrieve the underlying PaymentIntent from session.payment_intent for reconciliation or refunds.",
              codeExample: "// Checkout Session creates a PaymentIntent behind the scenes\nconst session = await stripe.checkout.sessions.create({\n  mode: 'payment',\n  line_items: [{ price: 'price_abc123', quantity: 1 }],\n  success_url: 'https://example.com/success',\n  cancel_url: 'https://example.com/cancel',\n});\n\n// After completion, retrieve the underlying PaymentIntent:\nconst completed = await stripe.checkout.sessions.retrieve(session.id, {\n  expand: ['payment_intent'],\n});\nconsole.log(completed.payment_intent.status); // 'succeeded'"
            }
          ],
          why: "As a Stripe support or integration engineer, PaymentIntents and Checkout are the two APIs you will encounter in the vast majority of merchant tickets. Understanding the PaymentIntent lifecycle lets you instantly diagnose why a payment is stuck, while knowing when to recommend Checkout vs a custom flow saves merchants weeks of development time and reduces their PCI scope.",
          mentalModel: "Think of a PaymentIntent like a shipping label for money. You create the label (amount, currency, destination), attach a payment method (the package), confirm it (hand it to the carrier), and then track it through processing until it arrives (succeeded). Checkout is like using a pre-built shipping kiosk that fills out the label, collects the package, and hands it off -- all in one step.",
          concepts: [
            {
              title: "The PaymentIntent Lifecycle & Checkout Sessions",
              explanation: "A PaymentIntent represents a single attempt to collect a payment. It tracks the lifecycle from creation through confirmation, optional 3D Secure authentication, processing, and final success or failure. Checkout Sessions provide a Stripe-hosted UI that orchestrates this entire flow -- collecting payment details, handling SCA/3DS, and managing the PaymentIntent automatically. Understanding both lets you advise merchants on the right level of abstraction for their use case.",
              example: "A merchant calls in saying their payments are stuck in 'requires_action' status. You recognize this means 3D Secure authentication was triggered but the customer never completed the challenge. You advise them to either use Checkout (which handles 3DS automatically in the hosted UI) or ensure their frontend properly handles the stripe.confirmPayment() response and redirects to the 3DS challenge when next_action is present.",
              codeSnippet: "import Stripe from 'stripe';\nconst stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);\n\n// --- Option A: Custom PaymentIntent flow ---\nconst paymentIntent = await stripe.paymentIntents.create({\n  amount: 5000, // $50.00 in cents\n  currency: 'usd',\n  payment_method_types: ['card'],\n  metadata: { order_id: 'order_12345' },\n});\n// Return paymentIntent.client_secret to the frontend\n// Frontend calls: stripe.confirmCardPayment(clientSecret, { payment_method: { card: cardElement } })\n\n// --- Option B: Stripe Checkout (hosted) ---\nconst session = await stripe.checkout.sessions.create({\n  mode: 'payment',\n  line_items: [\n    {\n      price_data: {\n        currency: 'usd',\n        product_data: { name: 'Premium Widget' },\n        unit_amount: 5000,\n      },\n      quantity: 1,\n    },\n  ],\n  success_url: 'https://example.com/success?session_id={CHECKOUT_SESSION_ID}',\n  cancel_url: 'https://example.com/cancel',\n});\n// Redirect customer to session.url\n\n// --- Checking PaymentIntent status ---\nconst pi = await stripe.paymentIntents.retrieve('pi_abc123');\nswitch (pi.status) {\n  case 'requires_payment_method': console.log('Customer has not provided payment details'); break;\n  case 'requires_confirmation':   console.log('Payment method attached, awaiting confirmation'); break;\n  case 'requires_action':         console.log('3DS or redirect required -- check pi.next_action'); break;\n  case 'processing':              console.log('Payment is being processed by the network'); break;\n  case 'succeeded':               console.log('Payment successful!'); break;\n  case 'canceled':                console.log('Payment was canceled'); break;\n}"
            }
          ],
          miniExercises: [
            {
              id: "stripe-1-1-m1",
              title: "Create a PaymentIntent with metadata",
              question: "Write a function that creates a PaymentIntent for a given amount, currency, and order ID. The order ID should be stored in metadata for reconciliation.",
              steps: [
                {
                  instruction: "Initialize the Stripe client with the secret key from environment variables.",
                  example: "import Stripe from 'stripe';\nconst stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);",
                  hint: "Always use environment variables for the secret key -- never hardcode it."
                },
                {
                  instruction: "Create a PaymentIntent with amount (in cents), currency, card payment method type, and metadata containing the order_id.",
                  example: "const pi = await stripe.paymentIntents.create({ amount, currency, ... });",
                  hint: "Remember that Stripe amounts are in the smallest currency unit -- $50.00 = 5000 cents."
                },
                {
                  instruction: "Return the client_secret so the frontend can complete the payment.",
                  hint: "The client_secret is the only value the frontend needs to confirm the payment. Never expose the full PaymentIntent object to the client."
                }
              ],
              solution: "import Stripe from 'stripe';\nconst stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);\n\nasync function createPayment(amountCents: number, currency: string, orderId: string) {\n  const paymentIntent = await stripe.paymentIntents.create({\n    amount: amountCents,\n    currency,\n    payment_method_types: ['card'],\n    metadata: { order_id: orderId },\n  });\n  return { clientSecret: paymentIntent.client_secret };\n}",
              explanation: "Storing the order_id in metadata is critical for reconciliation -- it links the Stripe payment to your internal order system. The client_secret is returned to the frontend where stripe.js handles the sensitive card data, keeping your server out of PCI scope."
            },
            {
              id: "stripe-1-1-m2",
              title: "Diagnose a stuck PaymentIntent",
              question: "A merchant reports that payments are 'stuck' and never completing. Given a PaymentIntent ID, write a diagnostic function that retrieves it and returns a human-readable explanation of the current status and recommended next action.",
              steps: [
                {
                  instruction: "Retrieve the PaymentIntent by ID using the Stripe SDK.",
                  example: "const pi = await stripe.paymentIntents.retrieve(piId);",
                  hint: "Use expand: ['latest_charge'] if you also need charge-level details like failure codes."
                },
                {
                  instruction: "Switch on pi.status and return a diagnosis object with status, explanation, and recommendedAction fields.",
                  hint: "The most common 'stuck' statuses are requires_payment_method, requires_confirmation, and requires_action."
                },
                {
                  instruction: "For the requires_action status, check pi.next_action.type to provide specific guidance (e.g., redirect_to_url for 3DS).",
                  hint: "next_action.type can be 'redirect_to_url', 'use_stripe_sdk', or 'alipay_handle_redirect' among others."
                }
              ],
              solution: "async function diagnosePaymentIntent(piId: string) {\n  const pi = await stripe.paymentIntents.retrieve(piId);\n  const diagnoses: Record<string, { explanation: string; action: string }> = {\n    requires_payment_method: {\n      explanation: 'No payment method attached yet.',\n      action: 'Customer needs to enter card details on the frontend.'\n    },\n    requires_confirmation: {\n      explanation: 'Payment method attached but not confirmed.',\n      action: 'Frontend must call stripe.confirmCardPayment(clientSecret).'\n    },\n    requires_action: {\n      explanation: `Additional action required: ${pi.next_action?.type || 'unknown'}.`,\n      action: 'Frontend must handle next_action -- typically a 3DS redirect.'\n    },\n    processing: {\n      explanation: 'Payment is being processed by the card network.',\n      action: 'Wait -- this usually resolves within seconds. Listen for the payment_intent.succeeded webhook.'\n    },\n    succeeded: {\n      explanation: 'Payment completed successfully.',\n      action: 'No action needed -- funds will be available in your balance.'\n    },\n  };\n  return { id: pi.id, status: pi.status, ...(diagnoses[pi.status] || { explanation: 'Unknown status', action: 'Contact Stripe support.' }) };\n}",
              explanation: "This diagnostic pattern is the bread and butter of Stripe support. Most 'stuck payment' tickets are resolved by identifying that the frontend integration is incomplete -- the PaymentIntent was created server-side but the client-side confirmation step was never implemented or is failing silently."
            },
            {
              id: "stripe-1-1-m3",
              title: "Create a Checkout Session with line items",
              question: "Write a function that creates a Stripe Checkout Session in payment mode with dynamically provided product name, unit amount, and quantity. Include success and cancel URLs.",
              steps: [
                {
                  instruction: "Accept parameters for productName, unitAmountCents, quantity, successUrl, and cancelUrl.",
                  example: "async function createCheckout(productName: string, unitAmountCents: number, ...)",
                  hint: "Use price_data with product_data inline rather than requiring a pre-created Price object -- this is more flexible for one-off payments."
                },
                {
                  instruction: "Create the Checkout Session using stripe.checkout.sessions.create() with mode 'payment' and the provided line items.",
                  hint: "Use {CHECKOUT_SESSION_ID} in the success_url as a template variable -- Stripe replaces it with the actual session ID on redirect."
                },
                {
                  instruction: "Return the session URL for redirecting the customer.",
                  hint: "session.url is the Stripe-hosted payment page URL. Redirect the customer's browser to this URL."
                }
              ],
              solution: "async function createCheckout(\n  productName: string,\n  unitAmountCents: number,\n  quantity: number,\n  successUrl: string,\n  cancelUrl: string\n) {\n  const session = await stripe.checkout.sessions.create({\n    mode: 'payment',\n    line_items: [\n      {\n        price_data: {\n          currency: 'usd',\n          product_data: { name: productName },\n          unit_amount: unitAmountCents,\n        },\n        quantity,\n      },\n    ],\n    success_url: `${successUrl}?session_id={CHECKOUT_SESSION_ID}`,\n    cancel_url: cancelUrl,\n  });\n  return { url: session.url, sessionId: session.id };\n}",
              explanation: "Checkout Sessions are the fastest way to accept payments with Stripe. By using price_data inline, you avoid needing to pre-create Product and Price objects in the dashboard. The {CHECKOUT_SESSION_ID} template variable lets your success page retrieve the session to confirm the payment and display order details."
            }
          ],
          resources: [
            { label: "Stripe PaymentIntents API Reference", url: "https://stripe.com/docs/api/payment_intents" },
            { label: "Stripe Checkout Quickstart", url: "https://stripe.com/docs/checkout/quickstart" }
          ],
          whyItMatters: "PaymentIntents and Checkout account for the overwhelming majority of Stripe integration tickets. A support engineer who can immediately identify where a payment is stuck in its lifecycle -- and explain the fix to a stressed merchant losing revenue -- is worth their weight in gold. Every minute a payment is stuck is lost revenue for the merchant, so speed of diagnosis directly impacts customer satisfaction and retention."
        }
      ],
      review: {
        id: "stripe-ch1-review",
        type: "ChapterReview",
        coversLessons: ["stripe-1-1"],
        questions: [
          {
            prompt: "A merchant's PaymentIntent is stuck in 'requires_action' status. What does this mean and what should they do?",
            expectedAnswer: "The payment requires additional customer authentication, typically 3D Secure. The frontend must handle the next_action from the PaymentIntent -- usually by redirecting the customer to complete the 3DS challenge via stripe.confirmPayment() or by following the redirect_to_url in next_action.",
            bloomLevel: "Understand",
            relatedLessonId: "stripe-1-1"
          },
          {
            prompt: "When should you recommend Stripe Checkout over a custom PaymentIntent integration?",
            expectedAnswer: "Recommend Checkout when the merchant wants a fast integration with minimal frontend code, needs built-in support for SCA/3DS, wants a mobile-optimized hosted payment page, or wants to minimize PCI scope. Recommend custom PaymentIntent flows when the merchant needs full UI control, inline payment forms, or complex multi-step checkout experiences.",
            bloomLevel: "Analyze",
            relatedLessonId: "stripe-1-1"
          },
          {
            prompt: "How does a Checkout Session relate to a PaymentIntent? Can you access the PaymentIntent after a Checkout Session completes?",
            expectedAnswer: "A Checkout Session in payment mode creates a PaymentIntent under the hood. After completion, you can retrieve the underlying PaymentIntent via session.payment_intent (using expand if needed). This is useful for issuing refunds, checking charge details, or reconciling with internal systems.",
            bloomLevel: "Understand",
            relatedLessonId: "stripe-1-1"
          }
        ]
      }
    },
    {
      id: "stripe-ch2",
      title: "Chapter 2 -- Webhooks & Connect",
      lessons: [
        {
          id: "stripe-2-1",
          title: "Webhook Handling, Signature Verification & Connect Platforms",
          duration: 70,
          type: "Domain",
          bloomLevel: "Apply",
          learningObjectives: [
            "Implement a webhook endpoint that receives Stripe events, verifies signatures using the webhook signing secret, and dispatches to appropriate handlers",
            "Diagnose common webhook failures including signature verification errors, missed events, and idempotency issues using the Stripe Dashboard and CLI",
            "Explain the Stripe Connect account types (Standard, Express, Custom) and implement a basic connected account onboarding flow with destination charges"
          ],
          commonMisconceptions: [
            {
              wrong: "You can parse the webhook JSON body first and then verify the signature -- the order doesn't matter",
              why: "Developers parse req.body as JSON before passing it to constructEvent, but signature verification requires the raw request body bytes to match the signature hash",
              correct: "Signature verification MUST use the raw request body (Buffer/string), not the parsed JSON object. If your framework (Express, Django) parses the body before your handler runs, you must configure it to preserve the raw body for the webhook route.",
              codeExample: "// WRONG: Express parses JSON body, signature fails\napp.use(express.json());\napp.post('/webhook', (req, res) => {\n  // req.body is already parsed -- signature verification will FAIL\n  const event = stripe.webhooks.constructEvent(req.body, sig, secret); // TypeError!\n});\n\n// CORRECT: Use raw body for webhook route\napp.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {\n  const sig = req.headers['stripe-signature']!;\n  const event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);\n  // req.body is a Buffer here -- signature verification succeeds\n});"
            },
            {
              wrong: "With Stripe Connect, the platform always receives all webhook events for connected accounts automatically",
              why: "Developers assume the platform's webhook endpoint receives events from connected accounts without additional configuration",
              correct: "To receive events from connected accounts, you must explicitly create a Connect webhook endpoint (either in the Dashboard or via API) that listens for 'connect' events. Standard account-level webhook endpoints only receive events for the platform's own account. You also need to use the connected account's signing secret when verifying these events.",
              codeExample: "// Platform webhook for own events\n// Dashboard: Endpoint URL -> Select 'Account events'\n\n// Connect webhook for connected account events\n// Dashboard: Endpoint URL -> Select 'Connect events'\n// Or via API:\nconst endpoint = await stripe.webhookEndpoints.create({\n  url: 'https://platform.com/webhooks/connect',\n  enabled_events: ['payment_intent.succeeded', 'account.updated'],\n  connect: true, // This flag is critical!\n});"
            }
          ],
          why: "Webhooks are the nervous system of any Stripe integration -- without them, merchants have no reliable way to know when payments succeed, subscriptions renew, or disputes are filed. Connect is Stripe's most complex product, powering marketplaces and platforms. As a support engineer, webhook and Connect tickets are the highest-complexity, highest-impact issues you will handle. Getting these right prevents merchants from losing money to missed events or misconfigured platform flows.",
          mentalModel: "Think of webhooks like a postal notification service. Instead of constantly checking your mailbox (polling the API), the post office (Stripe) sends a messenger to your door (endpoint) whenever a letter (event) arrives. The signature is like the messenger showing an ID badge -- you verify it before accepting the letter. Connect is like a franchise system: the franchisor (platform) and franchisees (connected accounts) each have their own mail, but the franchisor can opt into receiving copies of franchisee notifications.",
          concepts: [
            {
              title: "Webhook Signature Verification & Connect Platform Architecture",
              explanation: "Every Stripe webhook event is signed with an HMAC-SHA256 signature using your endpoint's signing secret. Verifying this signature ensures the event genuinely came from Stripe and hasn't been tampered with. Stripe Connect allows platforms to process payments on behalf of connected accounts using three models: Standard (Stripe-hosted onboarding, least platform control), Express (Stripe-hosted onboarding with some customization), and Custom (full platform control, most implementation work). Destination charges and direct charges are the two primary charge flows for moving money through a Connect platform.",
              example: "A platform merchant reports that their connected account's payments aren't triggering their webhook handler. You check the Dashboard and see they only have an account-level webhook endpoint, not a Connect endpoint. You guide them to create a Connect webhook endpoint and explain that events for connected accounts include the 'account' field identifying which connected account the event belongs to.",
              codeSnippet: "import Stripe from 'stripe';\nimport express from 'express';\n\nconst stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);\nconst app = express();\n\n// --- Webhook endpoint with signature verification ---\napp.post('/webhooks/stripe',\n  express.raw({ type: 'application/json' }),\n  async (req, res) => {\n    const sig = req.headers['stripe-signature'] as string;\n    let event: Stripe.Event;\n\n    try {\n      event = stripe.webhooks.constructEvent(\n        req.body,       // Raw body buffer -- NOT parsed JSON\n        sig,\n        process.env.STRIPE_WEBHOOK_SECRET!\n      );\n    } catch (err: any) {\n      console.error(`Signature verification failed: ${err.message}`);\n      return res.status(400).send(`Webhook Error: ${err.message}`);\n    }\n\n    // Handle events idempotently\n    switch (event.type) {\n      case 'payment_intent.succeeded':\n        const pi = event.data.object as Stripe.PaymentIntent;\n        // Check if already processed to ensure idempotency\n        console.log(`Payment ${pi.id} succeeded for $${pi.amount / 100}`);\n        break;\n      case 'payment_intent.payment_failed':\n        const failedPi = event.data.object as Stripe.PaymentIntent;\n        console.log(`Payment ${failedPi.id} failed: ${failedPi.last_payment_error?.message}`);\n        break;\n      case 'account.updated':\n        // Connect event -- check event.account for connected account ID\n        const account = event.data.object as Stripe.Account;\n        console.log(`Connected account ${event.account} updated: charges_enabled=${account.charges_enabled}`);\n        break;\n    }\n\n    res.json({ received: true });\n  }\n);\n\n// --- Connect: Create a connected account and destination charge ---\nasync function onboardConnectedAccount() {\n  // Create an Express connected account\n  const account = await stripe.accounts.create({\n    type: 'express',\n    country: 'US',\n    capabilities: {\n      card_payments: { requested: true },\n      transfers: { requested: true },\n    },\n  });\n\n  // Generate an onboarding link\n  const accountLink = await stripe.accountLinks.create({\n    account: account.id,\n    refresh_url: 'https://platform.com/onboard/refresh',\n    return_url: 'https://platform.com/onboard/complete',\n    type: 'account_onboarding',\n  });\n\n  return { accountId: account.id, onboardingUrl: accountLink.url };\n}\n\nasync function createDestinationCharge(connectedAccountId: string, amount: number) {\n  // Platform collects payment, transfers portion to connected account\n  const paymentIntent = await stripe.paymentIntents.create({\n    amount,\n    currency: 'usd',\n    payment_method_types: ['card'],\n    transfer_data: {\n      destination: connectedAccountId,\n      // Platform keeps 10% as a fee\n      amount: Math.round(amount * 0.9),\n    },\n  });\n  return paymentIntent;\n}"
            }
          ],
          miniExercises: [
            {
              id: "stripe-2-1-m1",
              title: "Implement webhook signature verification",
              question: "Write an Express route handler for /webhooks/stripe that verifies the Stripe signature and returns a 400 if verification fails.",
              steps: [
                {
                  instruction: "Configure the route to receive the raw body (Buffer) instead of parsed JSON.",
                  example: "app.post('/webhook', express.raw({ type: 'application/json' }), handler);",
                  hint: "express.raw() must be applied to the specific route, not globally -- otherwise it breaks your other JSON endpoints."
                },
                {
                  instruction: "Extract the stripe-signature header and call stripe.webhooks.constructEvent() with the raw body, signature, and your endpoint secret.",
                  hint: "Wrap constructEvent in a try/catch -- it throws if the signature is invalid or the payload has been tampered with."
                },
                {
                  instruction: "Return 200 with { received: true } on success, or 400 with the error message on failure.",
                  hint: "Always return 200 quickly -- if your handler takes too long, Stripe will retry the webhook thinking it failed."
                }
              ],
              solution: "app.post('/webhooks/stripe',\n  express.raw({ type: 'application/json' }),\n  (req, res) => {\n    const sig = req.headers['stripe-signature'] as string;\n    try {\n      const event = stripe.webhooks.constructEvent(\n        req.body,\n        sig,\n        process.env.STRIPE_WEBHOOK_SECRET!\n      );\n      // Process event...\n      res.json({ received: true });\n    } catch (err: any) {\n      res.status(400).send(`Webhook Error: ${err.message}`);\n    }\n  }\n);",
              explanation: "The raw body requirement is the #1 source of webhook integration issues at Stripe. Frameworks like Express, Django, and Rails parse JSON bodies by default, which changes the byte representation and invalidates the HMAC signature. This is the first thing to check on any 'webhook signature verification failed' ticket."
            },
            {
              id: "stripe-2-1-m2",
              title: "Handle webhook events idempotently",
              question: "Extend the webhook handler to process payment_intent.succeeded events. Implement idempotency by tracking processed event IDs to prevent duplicate order fulfillment.",
              steps: [
                {
                  instruction: "Create a Set (or in production, a database table) to track processed event IDs.",
                  example: "const processedEvents = new Set<string>();",
                  hint: "In production, use a database with a unique constraint on event_id -- an in-memory Set is lost on restart."
                },
                {
                  instruction: "Before processing the event, check if event.id has already been handled. If so, return 200 without re-processing.",
                  hint: "Stripe may send the same event multiple times. Your handler must be safe to run more than once for the same event."
                },
                {
                  instruction: "After successful processing, add the event ID to your tracking store.",
                  hint: "Add the ID after processing, not before -- if processing fails, you want Stripe to retry."
                }
              ],
              solution: "const processedEvents = new Set<string>();\n\nfunction handleWebhookEvent(event: Stripe.Event) {\n  if (processedEvents.has(event.id)) {\n    console.log(`Event ${event.id} already processed, skipping.`);\n    return;\n  }\n\n  switch (event.type) {\n    case 'payment_intent.succeeded':\n      const pi = event.data.object as Stripe.PaymentIntent;\n      // Fulfill the order using pi.metadata.order_id\n      console.log(`Fulfilling order for payment ${pi.id}`);\n      break;\n  }\n\n  processedEvents.add(event.id);\n}",
              explanation: "Idempotency is non-negotiable for webhook handlers. Network retries, Stripe retries on timeout, and manual replays from the Dashboard can all cause duplicate deliveries. Without idempotency, a customer could be charged once but receive two shipments, or a subscription could be activated twice. This is one of the most common production bugs in Stripe integrations."
            },
            {
              id: "stripe-2-1-m3",
              title: "Create a Connect Express account and onboarding link",
              question: "Write a function that creates a Stripe Connect Express account for a US-based seller, requests card_payments and transfers capabilities, and returns an onboarding URL.",
              steps: [
                {
                  instruction: "Create an Express account using stripe.accounts.create() with type 'express' and the required capabilities.",
                  example: "const account = await stripe.accounts.create({ type: 'express', ... });",
                  hint: "capabilities must be explicitly requested -- card_payments and transfers are the minimum for most marketplace platforms."
                },
                {
                  instruction: "Generate an Account Link using stripe.accountLinks.create() with type 'account_onboarding'.",
                  hint: "The refresh_url is where Stripe redirects if the link expires. The return_url is where Stripe redirects after successful onboarding."
                },
                {
                  instruction: "Return both the account ID (for your database) and the onboarding URL (for redirecting the seller).",
                  hint: "Account Links are single-use and expire. If the seller doesn't complete onboarding, you need to generate a new link."
                }
              ],
              solution: "async function onboardSeller(refreshUrl: string, returnUrl: string) {\n  const account = await stripe.accounts.create({\n    type: 'express',\n    country: 'US',\n    capabilities: {\n      card_payments: { requested: true },\n      transfers: { requested: true },\n    },\n  });\n\n  const accountLink = await stripe.accountLinks.create({\n    account: account.id,\n    refresh_url: refreshUrl,\n    return_url: returnUrl,\n    type: 'account_onboarding',\n  });\n\n  return {\n    accountId: account.id,\n    onboardingUrl: accountLink.url,\n  };\n}",
              explanation: "Express accounts are the most common Connect account type because they balance platform control with Stripe-handled KYC/onboarding. The onboarding link takes the seller through identity verification, bank account setup, and tax information collection -- all hosted by Stripe. After onboarding, listen for the account.updated webhook to confirm charges_enabled is true before routing payments."
            }
          ],
          resources: [
            { label: "Stripe Webhooks Best Practices", url: "https://stripe.com/docs/webhooks/best-practices" },
            { label: "Stripe Connect Overview", url: "https://stripe.com/docs/connect" }
          ],
          whyItMatters: "Webhook failures silently break payment flows -- orders go unfulfilled, subscriptions don't activate, and disputes are missed. Connect powers every major marketplace on Stripe, from Shopify to Lyft. As a support engineer, webhook debugging and Connect architecture questions are the most complex and highest-stakes tickets you will handle. Mastering these two areas puts you in the top tier of Stripe support engineers."
        }
      ],
      review: {
        id: "stripe-ch2-review",
        type: "ChapterReview",
        coversLessons: ["stripe-2-1"],
        questions: [
          {
            prompt: "Why does webhook signature verification fail when using express.json() middleware globally, and how do you fix it?",
            expectedAnswer: "express.json() parses the raw body into a JavaScript object before your handler runs. Stripe's constructEvent() needs the raw body bytes to compute the HMAC-SHA256 hash for verification. The fix is to use express.raw({ type: 'application/json' }) specifically on the webhook route so the body remains a Buffer.",
            bloomLevel: "Understand",
            relatedLessonId: "stripe-2-1"
          },
          {
            prompt: "What are the three Stripe Connect account types and when would you recommend each one?",
            expectedAnswer: "Standard: for platforms where connected accounts manage their own Stripe dashboard (least control, easiest setup). Express: for marketplaces that want Stripe-hosted onboarding but some branding control (balanced approach, most common). Custom: for platforms that need full control over the user experience and handle all communication with connected accounts (most complex, highest control).",
            bloomLevel: "Analyze",
            relatedLessonId: "stripe-2-1"
          },
          {
            prompt: "Why is idempotency important in webhook handlers, and how would you implement it?",
            expectedAnswer: "Stripe may deliver the same event multiple times due to retries, timeouts, or manual replays. Without idempotency, duplicate processing could cause double fulfillment, duplicate charges, or data inconsistencies. Implement it by storing processed event IDs (in a database with a unique constraint) and checking for duplicates before processing each event.",
            bloomLevel: "Apply",
            relatedLessonId: "stripe-2-1"
          }
        ]
      }
    }
  ]
};
