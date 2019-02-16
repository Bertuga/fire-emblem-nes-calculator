# Fire Emblem NES Damage/Arena Calculator

When I started playing the first Fire Emblem Dark Dragon and Sword of Light (Fire Emblem: Ankoku Ryu to Hikari no Tsurugi), having played newer entries in the series first, I found the lack of damage, hit% and number of attacks information before the attack a little letdown. And the fact that you can't escape from the arena a little too risky.

So I found the calculations for both theses problems and decided to make an app, but I scraped the idea. 

Sometime later, I decided to learn something new. The problem with learning something new for me is making some practical stuff with it. Then I remembered this little calculator and decided to do it with VueJS with build, deploy and tests.

I think it went well. You can check it here: [https://bertuga.github.io/fire-emblem-nes-calculator/](https://bertuga.github.io/fire-emblem-nes-calculator/)

Some observations:

 - I decided against filtering weapons by the classes that can use it, so it could present some "what-if" scenarios, like having a Lord with an Axe (like Hector) or a Pegasus Knight with a Firearm;
 - Even though the attribute cap is 20 in the game, I limited it to 99;
 - I used the translations from Serene's Forest, so Imhullu is named Maph, for example;
 - Speaking of Imhullu, although it has the immunity factor, unless against an Starlight user, I didn't put it in;
 - You can't win against Gharnef.
 
 I think that's it.

Using it is pretty simple, just filling the form and the values will be updated.

Some arena values where duplicated, so there are some results with two possibilities, these possibilities are there as well.

Any feedback is appreciated.

## Credits

 - Serenes Forest for the calculations: [Serenes Forest](https://serenesforest.net/dark-dragon-and-sword-of-light/miscellaneous/-calculations/)
 - Shop/Arena faq by Juigi Kario for the arena data: [FAQ](https://gamefaqs.gamespot.com/nes/562649-fire-emblem-ankoku-ryu-to-hikari-no-tsurugi/faqs/21979)
 - Arena calculation from user Julius Nepos on Serenes Forest Forum: [Post](https://serenesforest.net/forums/index.php?/topic/50411-help-with-fe1-arena/&do=findComment&comment=3422631)
