
import React from 'react';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="container max-w-5xl mx-auto px-4">
        <NavBar />
        
        <main className="flex-grow py-12">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-medium mb-8 text-earth-800">
              Frequently Asked Questions
            </h1>
            
            <p className="text-stone-600 mb-8">
              Here are answers to common questions about Coreleven. If you don't see your question answered below, 
              feel free to reach out through our contact page.
            </p>
            
            <Accordion type="single" collapsible className="w-full">
              {/* Core Questions */}
              <AccordionItem value="what-is-goal">
                <AccordionTrigger className="text-lg font-medium text-earth-700">
                  What is the goal of Coreleven?
                </AccordionTrigger>
                <AccordionContent className="text-stone-700">
                  To grow in trusted circles of 11 through rhythm, clarity, and shared purpose. Coreleven creates a structure 
                  for personal development that is intimate, intentional, and built on trust rather than algorithms or content consumption.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="pyramid-scheme">
                <AccordionTrigger className="text-lg font-medium text-earth-700">
                  Is this a pyramid scheme?
                </AccordionTrigger>
                <AccordionContent className="text-stone-700">
                  No. There's no top, no payouts — just aligned action, shared growth, and individual circles. The one-time contribution 
                  of $11.11 goes toward building the system and tools, not to other members. There is no hierarchical structure where earlier 
                  participants benefit from later ones.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="what-expected">
                <AccordionTrigger className="text-lg font-medium text-earth-700">
                  What's expected of me?
                </AccordionTrigger>
                <AccordionContent className="text-stone-700">
                  Invite 10 aligned people to complete your Grove. After that, your rhythm is your own. Coreleven encourages 
                  a regular practice of reflection and growth, but the specific format is adaptable to your circle's needs 
                  and preferences.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="what-to-tell">
                <AccordionTrigger className="text-lg font-medium text-earth-700">
                  What do I tell people I want to invite?
                </AccordionTrigger>
                <AccordionContent className="text-stone-700">
                  "I'm building a Grove — 11 people, one rhythm. I want you in mine." You can also share that this is a 
                  structure for intentional growth with trusted connections, not another social network or content platform.
                </AccordionContent>
              </AccordionItem>
              
              {/* Additional Anticipated Questions */}
              <AccordionItem value="payment">
                <AccordionTrigger className="text-lg font-medium text-earth-700">
                  Why is there a payment of $11.11?
                </AccordionTrigger>
                <AccordionContent className="text-stone-700">
                  The one-time payment of $11.11 serves as a small commitment threshold and helps fund the development of 
                  tools and systems that support the Coreleven structure. It's not recurring, and it's not distributed to 
                  members — it goes directly into building and maintaining the system itself.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="time-commitment">
                <AccordionTrigger className="text-lg font-medium text-earth-700">
                  How much time does Coreleven require?
                </AccordionTrigger>
                <AccordionContent className="text-stone-700">
                  Beyond building your Grove (inviting 10 people), the time commitment is flexible. The recommended rhythm 
                  involves brief, regular check-ins (weekly or biweekly) and personal reflection. The system is designed to 
                  enhance your growth without becoming a burden or distraction.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="why-eleven">
                <AccordionTrigger className="text-lg font-medium text-earth-700">
                  Why specifically 11 people?
                </AccordionTrigger>
                <AccordionContent className="text-stone-700">
                  Eleven (you plus ten others) represents an intentional balance — large enough for diversity of perspective 
                  but small enough for intimacy and trust. This number creates a meaningful container while remaining manageable, 
                  allowing for genuine connection without becoming overwhelming.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="complete-grove">
                <AccordionTrigger className="text-lg font-medium text-earth-700">
                  What happens after my Grove is complete?
                </AccordionTrigger>
                <AccordionContent className="text-stone-700">
                  Once your Grove is complete, you enter a deeper layer of the system. Your focus shifts from building to 
                  nurturing the growth within your circle. You'll gain access to additional tools and practices designed to 
                  support the ongoing rhythm of your Grove.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="digital-platform">
                <AccordionTrigger className="text-lg font-medium text-earth-700">
                  Is this another digital platform or app?
                </AccordionTrigger>
                <AccordionContent className="text-stone-700">
                  No. While there are minimal digital tools to facilitate Grove-building and tracking, Coreleven is fundamentally 
                  a structure, not a platform. The focus is on creating authentic rhythm and connection that exists beyond screens, 
                  not building another digital space that demands constant attention.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="someone-leaves">
                <AccordionTrigger className="text-lg font-medium text-earth-700">
                  What if someone in my Grove decides to leave?
                </AccordionTrigger>
                <AccordionContent className="text-stone-700">
                  If someone leaves your Grove after it's been completed, the circle remains intact. The structure honors 
                  the original formation while allowing for natural evolution. If someone leaves before your Grove is complete, 
                  you'll be able to invite someone else to fill their spot.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="after-inviting">
                <AccordionTrigger className="text-lg font-medium text-earth-700">
                  Do I need to wait until all 10 invitees join before anything happens?
                </AccordionTrigger>
                <AccordionContent className="text-stone-700">
                  You can begin establishing rhythm with those who have already joined while your Grove is still forming. 
                  The focus is on quality connection, not rushing to fill slots. However, certain aspects of the system only 
                  become available once your Grove is complete.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="larger-community">
                <AccordionTrigger className="text-lg font-medium text-earth-700">
                  Is there a larger Coreleven community beyond my Grove?
                </AccordionTrigger>
                <AccordionContent className="text-stone-700">
                  Yes, but the emphasis remains on your immediate Grove. The larger Coreleven network exists as a resource 
                  rather than a primary focus. Occasional gatherings, shared tools, and collective moments will connect the 
                  broader system, but your growth happens primarily within your circle of 11.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default FAQ;
